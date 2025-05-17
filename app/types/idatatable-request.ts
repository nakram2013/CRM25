export interface IPagination{
    pageIndex: number;
    pageSize: number;
}
export interface IDataTableRequest{
    pagination :IPagination
    sortBy : string,
    isDescending : boolean,
    Type : string
}