export declare class PaginatedDto<TData> {
    count: number;
    limit: number;
    offset: number;
    results: TData[];
}
