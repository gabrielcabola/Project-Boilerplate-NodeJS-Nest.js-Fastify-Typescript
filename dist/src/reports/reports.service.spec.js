"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportRepositoryFake = void 0;
const testing_1 = require("@nestjs/testing");
const typeorm_1 = require("@nestjs/typeorm");
const report_entity_1 = require("./entities/report.entity");
const const_1 = require("./interfaces/const");
const reports_service_1 = require("./reports.service");
class ReportRepositoryFake {
    constructor() {
        this.create = () => jest.fn();
        this.save = () => jest.fn();
        this.remove = () => jest.fn();
        this.findOne = () => jest.fn();
        this.findAndCount = () => jest.fn();
    }
}
exports.ReportRepositoryFake = ReportRepositoryFake;
describe('ReportsService', () => {
    let service;
    let reportRepository;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                reports_service_1.ReportsService,
                {
                    provide: typeorm_1.getRepositoryToken(report_entity_1.Report),
                    useClass: ReportRepositoryFake,
                },
            ],
        }).compile();
        service = module.get(reports_service_1.ReportsService);
        reportRepository = module.get(typeorm_1.getRepositoryToken(report_entity_1.Report));
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    it('should verify if not exist', async () => {
        const createReportDto = {
            userId: 1,
            contentId: '4',
            contentType: 'comment',
            sourcePlatform: const_1.SourcePlatform.WEB,
        };
        jest.spyOn(reportRepository, 'findAndCount').mockResolvedValueOnce([[], 0]);
        expect(await service.exist(createReportDto)).toEqual(false);
        expect(reportRepository.findAndCount).toBeCalled();
    });
    it('should return already exist', async () => {
        const createReportDto = {
            userId: 1,
            contentId: '4',
            contentType: 'comment',
            sourcePlatform: const_1.SourcePlatform.WEB,
        };
        jest.spyOn(reportRepository, 'findAndCount').mockResolvedValueOnce([[], 1]);
        expect(await service.exist(createReportDto)).toEqual(true);
        expect(reportRepository.findAndCount).toBeCalled();
    });
});
//# sourceMappingURL=reports.service.spec.js.map