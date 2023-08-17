import { HealthCheckService, TypeOrmHealthIndicator, MemoryHealthIndicator, DiskHealthIndicator } from '@nestjs/terminus';
export declare class HealthController {
    private health;
    private db;
    private memoryHealthIndicator;
    private diskHealthIndicator;
    constructor(health: HealthCheckService, db: TypeOrmHealthIndicator, memoryHealthIndicator: MemoryHealthIndicator, diskHealthIndicator: DiskHealthIndicator);
    check(): any;
}
