import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import HealthModule from './health.module';

describe('AppController Fastify (e2e)', () => {
  let app: NestFastifyApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [HealthModule],
    }).compile();
    app = moduleFixture.createNestApplication(new FastifyAdapter());
    await app.init();
  });
  describe('REST', () => {
    let restLogSpy: jest.SpyInstance;
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
