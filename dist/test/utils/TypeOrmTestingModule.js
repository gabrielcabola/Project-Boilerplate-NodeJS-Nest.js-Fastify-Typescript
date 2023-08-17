"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmTestingModule = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const TypeOrmTestingModule = () => [
    typeorm_1.TypeOrmModule.forRoot({
        type: 'better-sqlite3',
        database: ':memory:',
        dropSchema: true,
        entities: [],
        synchronize: true,
    })
];
exports.TypeOrmTestingModule = TypeOrmTestingModule;
//# sourceMappingURL=TypeOrmTestingModule.js.map