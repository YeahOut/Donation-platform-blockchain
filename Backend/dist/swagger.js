"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openApiDocument = void 0;
exports.openApiDocument = {
    openapi: '3.0.3',
    info: {
        title: 'Donation Service API',
        version: '1.0.0',
        description: 'APIs for login, points, and donation processing',
    },
    servers: [
        { url: 'http://localhost:4000', description: 'Local' }
    ],
    components: {
        securitySchemes: {
            BearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
        schemas: {
            Error: {
                type: 'object',
                properties: { message: { type: 'string' } },
            },
            LoginRequest: {
                type: 'object',
                required: ['username', 'password'],
                properties: {
                    username: { type: 'string' },
                    password: { type: 'string', minLength: 4 },
                },
            },
            LoginResponse: {
                type: 'object',
                properties: {
                    token: { type: 'string' },
                    name: { type: 'string' },
                    username: { type: 'string' },
                },
            },
            StatsResponse: {
                type: 'object',
                properties: {
                    totalAmount: { type: 'integer' },
                    totalDonors: { type: 'integer' },
                },
            },
            PointTransaction: {
                type: 'object',
                properties: {
                    id: { type: 'integer' },
                    userId: { type: 'integer' },
                    amount: { type: 'integer' },
                    note: { type: 'string', nullable: true },
                    createdAt: { type: 'string', format: 'date-time' },
                },
            },
            MeResponse: {
                type: 'object',
                properties: {
                    id: { type: 'integer' },
                    name: { type: 'string' },
                    username: { type: 'string' },
                    balance: { type: 'integer' },
                    history: { type: 'array', items: { $ref: '#/components/schemas/PointTransaction' } },
                },
            },
            DonateRequest: {
                type: 'object',
                required: ['amount'],
                properties: {
                    amount: { type: 'integer', minimum: 1 },
                },
            },
            DonateResponse: {
                type: 'object',
                properties: {
                    donationId: { type: 'integer' },
                    status: { type: 'string', enum: ['PENDING'] },
                },
            },
            SettleRequest: {
                type: 'object',
                required: ['status'],
                properties: {
                    status: { type: 'string', enum: ['SUCCESS', 'FAILED'] },
                },
            },
            SettleResponse: {
                type: 'object',
                properties: {
                    id: { type: 'integer' },
                    status: { type: 'string', enum: ['SUCCESS', 'FAILED'] },
                },
            },
        },
    },
    paths: {
        '/api/login': {
            post: {
                summary: '로그인',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/LoginRequest' },
                        },
                    },
                },
                responses: {
                    '200': { description: 'OK', content: { 'application/json': { schema: { $ref: '#/components/schemas/LoginResponse' } } } },
                    '400': { description: 'Bad Request', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
                    '401': { description: 'Unauthorized', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
                },
            },
        },
        '/api/stats': {
            get: {
                summary: '누적 기부금/기부자 통계',
                responses: {
                    '200': { description: 'OK', content: { 'application/json': { schema: { $ref: '#/components/schemas/StatsResponse' } } } },
                },
            },
        },
        '/api/me': {
            get: {
                summary: '내 정보 및 포인트 내역',
                security: [{ BearerAuth: [] }],
                responses: {
                    '200': { description: 'OK', content: { 'application/json': { schema: { $ref: '#/components/schemas/MeResponse' } } } },
                    '401': { description: 'Unauthorized', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
                },
            },
        },
        '/api/donate': {
            post: {
                summary: '기부 진행',
                security: [{ BearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/DonateRequest' } } },
                },
                responses: {
                    '200': { description: 'OK', content: { 'application/json': { schema: { $ref: '#/components/schemas/DonateResponse' } } } },
                    '400': { description: 'Bad Request', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
                    '401': { description: 'Unauthorized', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
                },
            },
        },
        '/api/donation/{id}/settle': {
            post: {
                summary: '기부 성공/실패 확정',
                security: [{ BearerAuth: [] }],
                parameters: [
                    { in: 'path', name: 'id', required: true, schema: { type: 'integer' } }
                ],
                requestBody: {
                    required: true,
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/SettleRequest' } } },
                },
                responses: {
                    '200': { description: 'OK', content: { 'application/json': { schema: { $ref: '#/components/schemas/SettleResponse' } } } },
                    '400': { description: 'Bad Request', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
                    '401': { description: 'Unauthorized', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
                    '404': { description: 'Not Found', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
                },
            },
        },
        '/api/dev/seed': {
            post: {
                summary: '[DEV] 초기 데이터 시드',
                responses: { '200': { description: 'OK' } },
            },
        },
    },
};
