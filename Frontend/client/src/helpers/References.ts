

export enum ReferenceType {
    Story = "STORY",
    Document = "DOCUMENT",
    File = "FILE",
    Photo = "PHOTO",
    Person = "PERSON"
}

export interface IBasicReference {
    referenceId: number;
    sourceId: number;
    targetId: number;
    type: ReferenceType
}

export interface IReference extends IBasicReference{
    storyDateTime?: string;
    storyHeader?: string;
    fileTitle?: string;
    personName?: string;
    documentTitle?: string;
    photoTitle?: string;
}