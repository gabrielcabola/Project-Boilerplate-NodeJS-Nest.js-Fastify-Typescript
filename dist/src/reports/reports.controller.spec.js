"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportRepositoryFake = void 0;
const testing_1 = require("@nestjs/testing");
const report_entity_1 = require("./entities/report.entity");
const reports_controller_1 = require("./reports.controller");
const reports_service_1 = require("./reports.service");
const const_1 = require("./interfaces/const");
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
class ReportRepositoryFake {
    constructor() {
        this.create = () => jest.fn();
        this.save = () => jest.fn();
        this.remove = () => jest.fn();
        this.findOne = () => jest.fn();
        this.findAndCount = () => jest.fn();
        this.find = () => jest.fn();
        this.findAll = () => jest.fn();
    }
}
exports.ReportRepositoryFake = ReportRepositoryFake;
describe('ReportsController', () => {
    let service;
    let controller;
    let reportRepository;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [reports_controller_1.ReportsController],
            providers: [
                reports_service_1.ReportsService,
                {
                    provide: typeorm_1.getRepositoryToken(report_entity_1.Report),
                    useClass: ReportRepositoryFake,
                },
            ],
        }).compile();
        controller = module.get(reports_controller_1.ReportsController);
        service = module.get(reports_service_1.ReportsService);
        reportRepository = module.get(typeorm_1.getRepositoryToken(report_entity_1.Report));
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
    describe('create', () => {
        it('should create report', async () => {
            const createReportDto = {
                userId: 1,
                contentId: '4',
                contentType: 'comment',
                sourcePlatform: const_1.SourcePlatform.WEB,
            };
            const result = {
                id: 1,
                userId: 1,
                contentId: '4',
                sourcePlatform: const_1.SourcePlatform.WEB,
                contentType: 'comment',
                updatedAt: null,
                createdAt: null,
                status: 'reported',
            };
            jest.spyOn(service, 'create').mockResolvedValueOnce(result);
            expect(await controller.create(createReportDto)).toEqual(result);
            expect(service.create).toBeCalled();
        });
        it('should create an existent report', async () => {
            expect.assertions(4);
            const createReportDto = {
                userId: 1,
                contentId: '4',
                contentType: 'comment',
                sourcePlatform: const_1.SourcePlatform.WEB,
            };
            jest
                .spyOn(reportRepository, 'findAndCount')
                .mockResolvedValueOnce([[], 1]);
            jest.spyOn(service, 'exist');
            try {
                await controller.create(createReportDto);
            }
            catch (e) {
                expect(e).toBeInstanceOf(common_1.ForbiddenException);
                expect(e.status).toBe(403);
                expect(e.message).toBe('This Report already exist');
            }
            expect(service.exist).toBeCalled();
        });
    });
    describe('findAll', () => {
        const result = [
            {
                id: 1,
                userId: 1,
                contentId: '4',
                sourcePlatform: const_1.SourcePlatform.WEB,
                contentType: 'comment',
                updatedAt: null,
                createdAt: null,
                status: 'reported',
            },
            {
                id: 2,
                userId: 2,
                contentId: '3',
                sourcePlatform: const_1.SourcePlatform.IOS,
                contentType: 'comment',
                updatedAt: null,
                createdAt: null,
                status: 'reported',
            },
        ];
        it('list Reports', async () => {
            jest.spyOn(service, 'findAll').mockResolvedValue(result);
            const reports = await controller.findAll();
            expect(reports).toHaveLength(2);
        });
        it('should return an array of reports', async () => {
            jest.spyOn(service, 'findAll').mockResolvedValue(result);
            expect(await controller.findAll()).toBe(result);
        });
    });
});
//# sourceMappingURL=reports.controller.spec.js.map