import { Report } from './entities/report.entity';
export declare class ReportRepositoryFake {
    create: () => any;
    save: () => any;
    remove: () => any;
    findOne: () => any;
    findAndCount: () => any;
    find: () => any;
    findAll: () => any;
}
export interface ReportResponse extends Report {
    status: string;
}
