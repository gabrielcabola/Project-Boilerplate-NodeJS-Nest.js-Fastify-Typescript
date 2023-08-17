"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigService = void 0;
const dotenv = require("dotenv");
const fs = require("fs");
const path_1 = require("path");
class ConfigService {
    constructor(filePath) {
        this.envConfig = dotenv.parse(fs.readFileSync(filePath));
    }
    get(key) {
        return this.envConfig[key];
    }
    isEnv(env) {
        return this.envConfig.APP_ENV === env;
    }
    dbConfig() {
        const app_env = process.env.APP_ENV || this.get('APP_ENV') || 'prod';
        const sync = app_env === 'dev' ? process.env.DB_SYNC || this.get('DB_SYNC') : false;
        return {
            type: process.env.DB_TYPE || this.get('DB_TYPE') || 'postgres',
            host: process.env.DB_HOST || this.get('DB_HOST'),
            port: process.env.DB_PORT || this.get('DB_PORT'),
            username: process.env.DB_USERNAME || this.get('DB_USERNAME'),
            password: process.env.DB_PASSWORD || this.get('DB_PASSWORD'),
            database: process.env.DB_DATABASE || this.get('DB_DATABASE'),
            entities: [path_1.join(__dirname, '../**', '/**/*.entity.{ts,js}')],
            synchronize: sync,
        };
    }
}
exports.ConfigService = ConfigService;
//# sourceMappingURL=config.service.js.map