import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { TypeOrmModule } from '@nestjs/typeorm';
//App modules
import HealthModule from './health/health.module';
import { ConfigModule, ConfigService } from './config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.dbConfig(),
    }),
    HealthModule,
    CoreModule,
  ],
})
export class AppModule {}
