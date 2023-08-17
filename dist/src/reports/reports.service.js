"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsService = void 0;
const common_1 = require("@nestjs/common");
const report_entity_1 = require("./entities/report.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
let ReportsService = class ReportsService {
    constructor(reportRepository) {
        this.reportRepository = reportRepository;
    }
    async create(createReportDto) {
        return this.reportRepository.save(createReportDto);
    }
    async findAll() {
        return this.reportRepository.find();
    }
    async exist(getReportDto) {
        const exist = await this.reportRepository.findAndCount({
            userId: getReportDto.userId,
            contentId: getReportDto.contentId,
            contentType: getReportDto.contentType,
        });
        return exist && exist[1] > 0;
    }
    async findOne(id) {
        const report = this.reportRepository.findOne({ id });
        if (!report) {
            throw new common_1.NotFoundException('No report found.');
        }
        return report;
    }
    async remove(id) {
        const report = await this.findOne(id);
        if (report === undefined)
            throw new common_1.NotFoundException();
        try {
            await this.reportRepository.delete({
                id: report.id,
                userId: report.userId,
            });
            return 'successed removed';
        }
        catch (error) {
            return error;
        }
    }
};
ReportsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(report_entity_1.Report)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], ReportsService);
exports.ReportsService = ReportsService;
//# sourceMappingURL=reports.service.js.map