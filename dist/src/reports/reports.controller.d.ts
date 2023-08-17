import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { Report } from './entities/report.entity';
export interface ReportResponse extends Report {
    status: string;
}
export declare class ReportsController {
    private readonly reportsService;
    constructor(reportsService: ReportsService);
    create(createReportDto: CreateReportDto): Promise<ReportResponse>;
    findAll(): Promise<Report[]>;
    findOne(id: number): Promise<Report>;
    remove(id: number): Promise<string>;
}
