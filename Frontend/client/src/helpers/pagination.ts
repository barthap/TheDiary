export enum SortOrder {
    ASC,
    DESC
}

export interface ISortConfig {
    property: string;
    order: SortOrder;
}

export interface IPageConfig {
    page?: number;
    size?: number;
    sort?: ISortConfig;
}

export class PageRequest implements IPageConfig{
    readonly page: number;
    readonly size: number;
    sort?: ISortConfig;

    constructor(page: number = 0, size: number = 50, sort: ISortConfig = null) {
        this.page = page;
        this.size = size;
        this.sort = sort;
    }
}

