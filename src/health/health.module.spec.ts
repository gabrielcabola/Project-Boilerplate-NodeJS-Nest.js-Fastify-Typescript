import { Test } from '@nestjs/testing';
import HealthModule from './health.module';
import { HealthController } from './health.controller';
import { TerminusModule } from '@nestjs/terminus';

describe('HealthModule', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [HealthModule, TerminusModule],
      controllers: [HealthController],
    }).compile();

    expect(module).toBeDefined();
    expect(module.get(TerminusModule)).toBeInstanceOf(TerminusModule);
    expect(module.get(HealthController)).toBeInstanceOf(HealthController);
  });
});
