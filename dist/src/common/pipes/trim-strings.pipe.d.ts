import { AbstractTransformPipe } from './abstract-transform.pipe';
export declare class TrimStringsPipe extends AbstractTransformPipe {
    except(): string[];
    protected transformValue(value: number | string | any): string | any;
}
