"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const health_module_1 = require("./health.module");
const health_controller_1 = require("./health.controller");
const terminus_1 = require("@nestjs/terminus");
describe('HealthModule', () => {
    it('should compile the module', async () => {
        const module = await testing_1.Test.createTestingModule({
            imports: [health_module_1.default, terminus_1.TerminusModule],
            controllers: [health_controller_1.HealthController],
        }).compile();
        expect(module).toBeDefined();
        expect(module.get(terminus_1.TerminusModule)).toBeInstanceOf(terminus_1.TerminusModule);
        expect(module.get(health_controller_1.HealthController)).toBeInstanceOf(health_controller_1.HealthController);
    });
});
//# sourceMappingURL=health.module.spec.js.map