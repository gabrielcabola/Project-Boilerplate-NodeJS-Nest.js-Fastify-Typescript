import { Timestamp } from 'typeorm';
import { SourcePlatform } from '../interfaces/const';
export declare class Report {
    id: number;
    userId: number;
    contentId: string;
    contentType: string;
    sourcePlatform: SourcePlatform;
    updatedAt: Timestamp;
    createdAt: Timestamp;
}
