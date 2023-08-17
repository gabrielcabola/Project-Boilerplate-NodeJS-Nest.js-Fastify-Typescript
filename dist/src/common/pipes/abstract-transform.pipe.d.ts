import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
export declare abstract class AbstractTransformPipe implements PipeTransform {
    protected abstract transformValue(value: string | any): any;
    protected except(): string[];
    private isObject;
    private transformObject;
    transform(values: string | any, metadata: ArgumentMetadata): Promise<any>;
}
