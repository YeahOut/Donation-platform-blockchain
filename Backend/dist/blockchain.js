"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContracts = getContracts;
exports.onchainRecordDonation = onchainRecordDonation;
exports.readOnchainStats = readOnchainStats;
const ethers_1 = require("ethers");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const RPC_URL = process.env.SEPOLIA_RPC_URL || process.env.RPC_URL || '';
const PRIVATE_KEY = process.env.PRIVATE_KEY || '';
const TOKEN_ADDR = process.env.DONATION_TOKEN_ADDRESS || '';
const POOL_ADDR = process.env.DONATION_POOL_ADDRESS || '';
const donationTokenAbi = [
    'function name() view returns (string)',
    'function symbol() view returns (string)',
    'function decimals() view returns (uint8)',
    'function mint(address to,uint256 amount)',
    'function balanceOf(address a) view returns (uint256)'
];
const donationPoolAbi = [
    'function totalDonated() view returns (uint256)',
    'function uniqueDonors() view returns (uint256)',
    'function recordDonationFor(bytes32 donorHash,uint256 amount)'
];
function getWallet() {
    if (!RPC_URL || !PRIVATE_KEY)
        throw new Error('Missing RPC_URL/PRIVATE_KEY');
    const provider = new ethers_1.ethers.JsonRpcProvider(RPC_URL);
    return new ethers_1.ethers.Wallet(PRIVATE_KEY, provider);
}
function getContracts() {
    const wallet = getWallet();
    const token = new ethers_1.ethers.Contract(TOKEN_ADDR, donationTokenAbi, wallet);
    const pool = new ethers_1.ethers.Contract(POOL_ADDR, donationPoolAbi, wallet);
    return { token, pool, wallet };
}
async function onchainRecordDonation(userKey, amount) {
    const { token, pool } = getContracts();
    const donorHash = ethers_1.ethers.keccak256(ethers_1.ethers.toUtf8Bytes(userKey));
    const tx1 = await token.mint(POOL_ADDR, amount);
    const r1 = await tx1.wait();
    const tx2 = await pool.recordDonationFor(donorHash, amount);
    const r2 = await tx2.wait();
    return { mintTxHash: r1?.hash ?? tx1.hash, recordTxHash: r2?.hash ?? tx2.hash };
}
async function readOnchainStats() {
    const { token, pool } = getContracts();
    const [total, donors, poolBal] = await Promise.all([
        pool.totalDonated(),
        pool.uniqueDonors(),
        token.balanceOf(POOL_ADDR),
    ]);
    return {
        totalAmount: Number(total),
        totalDonors: Number(donors),
        poolBalance: Number(poolBal),
    };
}
