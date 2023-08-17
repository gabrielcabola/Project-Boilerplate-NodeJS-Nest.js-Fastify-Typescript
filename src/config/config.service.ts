import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { join } from 'path';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

export class ConfigService {
  private readonly envConfig: { [key: string]: string };
  constructor(filePath: string) {
    this.envConfig = dotenv.parse(fs.readFileSync(filePath));
  }

  get(key: string): string {
    return this.envConfig[key];
  }

  isEnv(env: string): boolean {
    return this.envConfig.APP_ENV === env;
  }

  dbConfig(): TypeOrmModuleAsyncOptions {
    const app_env = process.env.APP_ENV || this.get('APP_ENV') || 'prod';
    const sync =
      app_env === 'dev' ? process.env.DB_SYNC || this.get('DB_SYNC') : false;
    return {
      type: process.env.DB_TYPE || this.get('DB_TYPE') || 'postgres',
      host: process.env.DB_HOST || this.get('DB_HOST'),
      port: process.env.DB_PORT || this.get('DB_PORT'),
      username: process.env.DB_USERNAME || this.get('DB_USERNAME'),
      password: process.env.DB_PASSWORD || this.get('DB_PASSWORD'),
      database: process.env.DB_DATABASE || this.get('DB_DATABASE'),
      entities: [join(__dirname, '../**', '/**/*.entity.{ts,js}')],
      synchronize: sync,
      // migrationsRun: (! sync),
      // migrations: ['src/migrations/*{.ts,.js}'],
      // migrationsTableName: "migrations_typeorm",
      // cli: {
      //   migrationsDir: "src/migrations"
      // }
    } as TypeOrmModuleAsyncOptions;
  }
}
