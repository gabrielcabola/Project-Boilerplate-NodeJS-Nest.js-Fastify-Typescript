"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("./common/swagger");
const trim_strings_pipe_1 = require("./common/pipes/trim-strings.pipe");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const fastify_helmet_1 = require("fastify-helmet");
const app_module_1 = require("./app.module");
const dd_trace_1 = require("dd-trace");
async function bootstrap() {
    dd_trace_1.default.init();
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter({
        ignoreTrailingSlash: true,
    }));
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe(), new trim_strings_pipe_1.TrimStringsPipe());
    app.register(fastify_helmet_1.fastifyHelmet, {
        contentSecurityPolicy: {
            directives: {
                defaultSrc: [`'self'`],
                styleSrc: [`'self'`, `'unsafe-inline'`],
                imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
                scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
            },
        },
    });
    swagger_1.setupSwagger(app);
    await app.listen(process.env.APP_PORT || 3001, '0.0.0.0', function (err, address) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log(`Fastify Server listening on ${address}`);
    });
    console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
//# sourceMappingURL=main.js.map