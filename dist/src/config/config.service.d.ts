import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
export declare class ConfigService {
    private readonly envConfig;
    constructor(filePath: string);
    get(key: string): string;
    isEnv(env: string): boolean;
    dbConfig(): TypeOrmModuleAsyncOptions;
}
