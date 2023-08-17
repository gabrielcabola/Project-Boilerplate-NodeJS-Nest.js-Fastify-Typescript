import { PipeTransform } from '@nestjs/common';
export declare class ParseIntPipe implements PipeTransform<string> {
    transform(value: string): Promise<number>;
}
