"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const request = require("supertest");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const health_module_1 = require("./health.module");
describe('AppController Fastify (e2e)', () => {
    let app;
    beforeEach(async () => {
        const moduleFixture = await testing_1.Test.createTestingModule({
            imports: [health_module_1.default],
        }).compile();
        app = moduleFixture.createNestApplication(new platform_fastify_1.FastifyAdapter());
        await app.init();
    });
    describe('REST', () => {
        let restLogSpy;
        beforeEach(() => {
            restLogSpy = jest.spyOn(console, 'log');
        });
        afterEach(() => {
            restLogSpy.mockReset();
        });
        it('/health (GET)', () => {
            return request(app.getHttpServer())
                .get('/health')
                .expect(200)
                .expect({
                status: 'ok',
                info: { dog: { status: 'up', badboys: 0 } },
                error: {},
                details: { dog: { status: 'up', badboys: 0 } },
            });
        });
        it('/health (GET)', async () => {
            const res = await app.inject({
                method: 'GET',
                url: '/health',
            });
            expect(res.statusCode).toBe(200);
            expect(restLogSpy).toBeCalledTimes(1);
        });
    });
});
//# sourceMappingURL=health.e2e-spec.js.map