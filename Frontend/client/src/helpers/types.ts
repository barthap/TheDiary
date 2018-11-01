import {IReference} from "./References";


export interface EntityBase {
    id: number;
    createdDateTime: number
    updatedDateTime: number;
    referencedIn: IReference[];
    referencesTo: IReference[];
}

export interface IStory extends EntityBase {

    happenedDate: number;
    header: string;
    content: string;
}

export interface IPerson extends EntityBase {
    fullName: string;
    birthDate: number;
    description: string;
}

export interface IPhoto extends EntityBase {
    filename: string;
    title: string;
    description: string;
}

