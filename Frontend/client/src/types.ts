

export interface EntityBase {
    id: number;
    createdDateTime: number
    updatedDateTime: number;
}

export interface Story extends EntityBase {

    happenedDate: number;
    header: string;
    content: string;
}

export interface Person extends EntityBase {
    fullName: string;
    birthDate: number;
    description: string;
}

export enum SortOrder {
    ASC,
    DESC
}

export interface SortConfig {
    property: string;
    order: SortOrder;
}

export interface PageConfig {
    page?: number;
    size?: number;
    sort?: SortConfig;
}