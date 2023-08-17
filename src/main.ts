import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { setupSwagger } from './common/swagger';
import { TrimStringsPipe } from './common/pipes/trim-strings.pipe';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { fastifyHelmet } from 'fastify-helmet';
import { AppModule } from './app.module';
import tracer from 'dd-trace';

async function bootstrap() {
  tracer.init();
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      ignoreTrailingSlash: true,
    }),
  );
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe(), new TrimStringsPipe());
  app.register(fastifyHelmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
      },
    },
  });
  setupSwagger(app);

  await app.listen(
    process.env.APP_PORT || 3001,
    '0.0.0.0',
    function (err, address) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      console.log(`Fastify Server listening on ${address}`);
    },
  );
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
