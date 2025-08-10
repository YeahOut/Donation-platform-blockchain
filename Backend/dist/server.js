"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const prisma_1 = require("../generated/prisma");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = require("zod");
const blockchain_1 = require("./blockchain");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./swagger");
dotenv_1.default.config();
const app = (0, express_1.default)();
const prisma = new prisma_1.PrismaClient();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.openApiDocument));
app.get('/api/openapi.json', (_req, res) => res.json(swagger_1.openApiDocument));
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';
function authMiddleware(req, res, next) {
    const header = req.headers.authorization;
    if (!header)
        return res.status(401).json({ message: 'Unauthorized' });
    const token = header.replace('Bearer ', '');
    try {
        const payload = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.user = { id: payload.userId };
        next();
    }
    catch (e) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}
// 1. 로그인 api
app.post('/api/login', async (req, res) => {
    const schema = zod_1.z.object({ username: zod_1.z.string(), password: zod_1.z.string().min(4) });
    const parsed = schema.safeParse(req.body);
    if (!parsed.success)
        return res.status(400).json({ message: 'Invalid input' });
    const { username, password } = parsed.data;
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user)
        return res.status(401).json({ message: 'Invalid credentials' });
    const ok = await bcryptjs_1.default.compare(password, user.passwordHash);
    if (!ok)
        return res.status(401).json({ message: 'Invalid credentials' });
    const token = jsonwebtoken_1.default.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
    return res.json({ token, name: user.name, username: user.username });
});
// 2. 누적 기부금 및 누적 기부자 가져오는 api
app.get('/api/stats', async (_req, res) => {
    try {
        const chain = await (0, blockchain_1.readOnchainStats)();
        return res.json(chain);
    }
    catch {
        // fallback to DB when chain not configured
        const totalSuccessDonations = await prisma.donation.aggregate({
            _sum: { amount: true },
            where: { status: prisma_1.DonationStatus.SUCCESS },
        });
        const numDonors = await prisma.donation.groupBy({
            by: ['userId'],
            where: { status: prisma_1.DonationStatus.SUCCESS },
            _count: { userId: true },
        });
        return res.json({
            totalAmount: totalSuccessDonations._sum.amount ?? 0,
            totalDonors: numDonors.length,
        });
    }
});
// 3. 사용자 이름 및 포인트 내역 가져오는 api
app.get('/api/me', authMiddleware, async (req, res) => {
    const userId = req.user.id;
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            name: true,
            username: true,
            pointTransactions: {
                orderBy: { createdAt: 'desc' },
                take: 50,
            },
        },
    });
    if (!user)
        return res.status(404).json({ message: 'Not found' });
    const points = await prisma.pointTransaction.aggregate({ _sum: { amount: true }, where: { userId } });
    res.json({
        id: user.id,
        name: user.name,
        username: user.username,
        balance: points._sum.amount ?? 0,
        history: user.pointTransactions,
    });
});
// 내부 유틸: 토큰 이동 트랜잭션
async function moveBankToDonation(amount) {
    const bank = await prisma.token.findUnique({ where: { type: 'BANK' } });
    const donation = await prisma.token.findUnique({ where: { type: 'DONATION' } });
    if (!bank || !donation)
        throw new Error('Tokens not initialized');
    if (bank.balance < amount)
        throw new Error('Bank token insufficient');
    await prisma.token.update({ where: { id: bank.id }, data: { balance: bank.balance - amount } });
    await prisma.token.update({ where: { id: donation.id }, data: { balance: donation.balance + amount } });
}
// 4. 기부 진행 api -> 사용자 포인트 차감, 은행 토큰이 기부토큰으로 이동 (원자성 보장)
app.post('/api/donate', authMiddleware, async (req, res) => {
    const schema = zod_1.z.object({ amount: zod_1.z.number().int().positive() });
    const parsed = schema.safeParse(req.body);
    if (!parsed.success)
        return res.status(400).json({ message: 'Invalid input' });
    const { amount } = parsed.data;
    const userId = req.user.id;
    try {
        const result = await prisma.$transaction(async (tx) => {
            const current = await tx.pointTransaction.aggregate({ _sum: { amount: true }, where: { userId } });
            const balance = current._sum.amount ?? 0;
            if (balance < amount)
                throw new Error('Insufficient points');
            const donation = await tx.donation.create({ data: { userId, amount, status: prisma_1.DonationStatus.PENDING } });
            await tx.pointTransaction.create({ data: { userId, amount: -amount, note: 'donation' } });
            // 토큰 이동
            const bank = await tx.token.findUnique({ where: { type: 'BANK' } });
            const dtk = await tx.token.findUnique({ where: { type: 'DONATION' } });
            if (!bank || !dtk)
                throw new Error('Tokens not initialized');
            if (bank.balance < amount)
                throw new Error('Bank token insufficient');
            await tx.token.update({ where: { id: bank.id }, data: { balance: bank.balance - amount } });
            await tx.token.update({ where: { id: dtk.id }, data: { balance: dtk.balance + amount } });
            return donation;
        });
        res.json({ donationId: result.id, status: 'PENDING' });
    }
    catch (e) {
        return res.status(400).json({ message: e.message || 'Donation failed' });
    }
});
// 5. 기부 성공/실패 api
app.post('/api/donation/:id/settle', authMiddleware, async (req, res) => {
    const schema = zod_1.z.object({ status: zod_1.z.enum(['SUCCESS', 'FAILED']) });
    const parsed = schema.safeParse(req.body);
    if (!parsed.success)
        return res.status(400).json({ message: 'Invalid input' });
    const { status } = parsed.data;
    const donationId = Number(req.params.id);
    const donation = await prisma.donation.findUnique({ where: { id: donationId } });
    if (!donation)
        return res.status(404).json({ message: 'Donation not found' });
    if (donation.status !== prisma_1.DonationStatus.PENDING)
        return res.status(400).json({ message: 'Already settled' });
    try {
        const result = await prisma.$transaction(async (tx) => {
            if (status === 'SUCCESS') {
                await tx.donation.update({ where: { id: donationId }, data: { status: prisma_1.DonationStatus.SUCCESS } });
                const user = await tx.user.findUnique({ where: { id: donation.userId } });
                const userKey = `user:${user?.username || donation.userId}`;
                return { success: true, userKey, amount: donation.amount };
            }
            else {
                // 실패: 포인트 환급 + 토큰 롤백
                await tx.donation.update({ where: { id: donationId }, data: { status: prisma_1.DonationStatus.FAILED } });
                await tx.pointTransaction.create({ data: { userId: donation.userId, amount: donation.amount, note: 'donation refund' } });
                const bank = await tx.token.findUnique({ where: { type: 'DONATION' } });
                const dtk = await tx.token.findUnique({ where: { type: 'BANK' } });
                if (!bank || !dtk)
                    throw new Error('Tokens not initialized');
                if (bank.balance < donation.amount)
                    throw new Error('Donation token insufficient for refund');
                await tx.token.update({ where: { id: bank.id }, data: { balance: bank.balance - donation.amount } });
                await tx.token.update({ where: { id: dtk.id }, data: { balance: dtk.balance + donation.amount } });
                return { success: false };
            }
        }, { timeout: 15000 });
        let chainHashes = null;
        if (result.success) {
            try {
                chainHashes = await (0, blockchain_1.onchainRecordDonation)(result.userKey, result.amount);
            }
            catch {
                chainHashes = null;
            }
        }
        res.json({ id: donationId, status, tx: chainHashes });
    }
    catch (e) {
        res.status(400).json({ message: e.message || 'Settle failed' });
    }
});
// 간단한 헬스체크 및 토큰 초기화 엔드포인트(개발용)
app.post('/api/dev/seed', async (_req, res) => {
    const passwordHash = await bcryptjs_1.default.hash('test1234', 10);
    // Upsert users
    const tester = await prisma.user.upsert({
        where: { username: 'tester' },
        update: {},
        create: { username: 'tester', name: '테스터', passwordHash },
    });
    const molly = await prisma.user.upsert({
        where: { username: 'molly' },
        update: { name: '몰리', passwordHash },
        create: { username: 'molly', name: '몰리', passwordHash },
    });
    const sol = await prisma.user.upsert({
        where: { username: 'sol' },
        update: { name: '쏠', passwordHash },
        create: { username: 'sol', name: '쏠', passwordHash },
    });
    // Initialize tokens
    await prisma.token.upsert({ where: { type: 'BANK' }, update: { balance: 1000000 }, create: { type: 'BANK', balance: 1000000 } });
    await prisma.token.upsert({ where: { type: 'DONATION' }, update: { balance: 0 }, create: { type: 'DONATION', balance: 0 } });
    // Ensure target balances via delta transactions (idempotent)
    async function ensureBalance(userId, target, note) {
        const agg = await prisma.pointTransaction.aggregate({ _sum: { amount: true }, where: { userId } });
        const current = agg._sum.amount ?? 0;
        const delta = target - current;
        if (delta !== 0) {
            await prisma.pointTransaction.create({ data: { userId, amount: delta, note } });
        }
    }
    await ensureBalance(tester.id, 100000, 'adjust to target (tester)');
    await ensureBalance(molly.id, 15000, 'adjust to target (molly)');
    await ensureBalance(sol.id, 1200, 'adjust to target (sol)');
    res.json({ ok: true, users: [{ username: 'tester', name: '테스터', points: 100000 }, { username: 'molly', name: '몰리', points: 15000 }, { username: 'sol', name: '쏠', points: 1200 }] });
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running on http://localhost:${PORT}`);
});
