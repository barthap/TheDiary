import {ActionCreator, Action} from "redux";
import {IPhoto} from "../helpers/types";
import {
    ADD_PHOTO,
    ADD_PHOTO_STATUS, DELETE_PHOTO, DELETE_PHOTO_STATUS,
    FETCH_PHOTOS,
    FETCH_PHOTOS_STATUS,
    photoConstants, UPDATE_PHOTO, UPDATE_PHOTO_STATUS
} from "../consts/photo.constants";
import {IPageConfig} from "../helpers/pagination";

export interface FetchPhotosAction extends Action {
    type: FETCH_PHOTOS;
    payload?: IPageConfig;
}
export interface FetchPhotosStatus extends Action {
    type: FETCH_PHOTOS_STATUS;
    payload?: IPhoto[];
}

export interface AddPhotoAction extends Action {
    type: ADD_PHOTO;
    payload: {
        file: File,
        title: string
    };
}
export interface AddPhotoStatus extends Action {
    type: ADD_PHOTO_STATUS;
}

export interface UpdatePhotoAction extends Action {
    type: UPDATE_PHOTO;
    payload: IPhoto;
}
export interface UpdatePhotoStatus extends Action {
    type: UPDATE_PHOTO_STATUS,
    payload?: IPhoto;
}

type Id = number;
export interface DeletePhotoAction extends Action {
    type:DELETE_PHOTO,
    payload: Id;
}
export interface DeletePhotoStatus extends Action {
    type: DELETE_PHOTO_STATUS,
    payload?: Id;
}

const fetchPhotos: ActionCreator<FetchPhotosAction> = (pageable: IPageConfig = null) => ({
    type: photoConstants.FETCH_PHOTOS,
    payload: pageable
});
const fetchSuccess: ActionCreator<FetchPhotosStatus> = (items: IPhoto[]) => ({
    type: photoConstants.FETCH_PHOTOS_SUCCESS,
    payload: items
});
const fetchFailure: ActionCreator<FetchPhotosStatus> = () => ({type: photoConstants.FETCH_PHOTOS_FAILURE});
const fetchPending: ActionCreator<FetchPhotosStatus> = () => ({ type: photoConstants.FETCH_PHOTOS_PENDING });


const addPhoto: ActionCreator<AddPhotoAction> = (file: File, title: string) => ({
    type: photoConstants.ADD_PHOTO,
    payload: { file, title }
});
const addPhotoSuccess: ActionCreator<AddPhotoStatus> = () => ({type: photoConstants.ADD_PHOTO_SUCCESS});
const addPhotoFailure: ActionCreator<AddPhotoStatus> = () => ({type: photoConstants.ADD_PHOTO_FAILURE});
const addPhotoPending: ActionCreator<AddPhotoStatus> = () => ({type: photoConstants.ADD_PHOTO_PENDING});

const updatePhoto: ActionCreator<UpdatePhotoAction> = (photo: IPhoto) => ({
    type: photoConstants.UPDATE_PHOTO,
    payload: photo
});
const updatePhotoSuccess: ActionCreator<UpdatePhotoStatus> = (photo: IPhoto) => ({
    type: photoConstants.UPDATE_PHOTO_SUCCESS,
    payload: photo
});
const updatePhotoFailure: ActionCreator<UpdatePhotoStatus> = () => ({type: photoConstants.UPDATE_PHOTO_FAILURE});
const updatePhotoPending: ActionCreator<UpdatePhotoStatus> = () => ({type: photoConstants.UPDATE_PHOTO_PENDING});

const deletePhoto: ActionCreator<DeletePhotoAction> = (payload: Id) => ({
    type: photoConstants.DELETE_PHOTO,
    payload
});
const deletePhotoSuccess: ActionCreator<DeletePhotoStatus> = (payload: Id) => ({
    type: photoConstants.DELETE_PHOTO_SUCCESS,
    payload
});
const deletePhotoFailure: ActionCreator<DeletePhotoStatus> = () => ({type: photoConstants.DELETE_PHOTO_FAILURE});
const deletePhotoPending: ActionCreator<DeletePhotoStatus> = () => ({type: photoConstants.DELETE_PHOTO_PENDING});


export const photoActions = {
    fetchPhotos,    //fetch page of people from server
    fetchPending,
    fetchSuccess,
    fetchFailure,

    addPhoto,          //adds photo and saves on server
    addPhotoSuccess,
    addPhotoFailure,
    addPhotoPending,

    updatePhoto,
    updatePhotoSuccess,
    updatePhotoFailure,
    updatePhotoPending,

    deletePhoto,
    deletePhotoSuccess,
    deletePhotoFailure,
    deletePhotoPending
};