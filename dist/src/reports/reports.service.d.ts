import { CreateReportDto } from './dto/create-report.dto';
import { GetReportDto } from './dto/get-report.dto';
import { Report } from './entities/report.entity';
import { Repository } from 'typeorm';
export declare class ReportsService {
    private readonly reportRepository;
    constructor(reportRepository: Repository<Report>);
    create(createReportDto: CreateReportDto): Promise<Report>;
    findAll(): Promise<Report[]>;
    exist(getReportDto: GetReportDto): Promise<boolean>;
    findOne(id: number): Promise<Report>;
    remove(id: number): Promise<string>;
}
