import {IPhoto} from "../helpers/types";
import {Reducer} from "redux";
import {photoConstants} from "../consts/photo.constants";
import {IndexedCollection, IndexedDictionary} from "../helpers/Dictionary";


export type PhotoList = IndexedCollection<IPhoto>;

export interface IPhotosState {
    items: PhotoList;
    fetching: boolean;
    isCrudPending: boolean;
}

const initialState: IPhotosState = {
    items: new IndexedDictionary<IPhoto>('id'),
    fetching: false,
    isCrudPending: false
};

const photosReducer: Reducer<IPhotosState> = (state: IPhotosState = initialState, action) => {
    const { payload } = action;
    switch (action.type) {
            //FETCH
        case photoConstants.FETCH_PHOTOS_PENDING:
            return {...state, fetching: true};
        case photoConstants.FETCH_PHOTOS_FAILURE:
            return {...state, fetching: false};
        case photoConstants.FETCH_PHOTOS_SUCCESS:
            return {...state, fetching: false,
                items: new IndexedDictionary<IPhoto>('id', payload)
            };

            //CRUD SUCCESS
        case photoConstants.ADD_PHOTO_SUCCESS:
            return {...state, isCrudPending: false};
        case photoConstants.UPDATE_PHOTO_SUCCESS:
            return {...state, isCrudPending: false,
                    items: state.items.Set(payload)};
        case photoConstants.DELETE_PHOTO_SUCCESS:
            return {...state, isCrudPending: false,
                items: state.items.Remove(payload)
            };

            //CRUD PENDING
        case photoConstants.UPDATE_PHOTO_PENDING:
        case photoConstants.ADD_PHOTO_PENDING:
        case photoConstants.DELETE_PHOTO_PENDING:
            return {...state, isCrudPending: true};

            //CRUD FAILURE
        case photoConstants.ADD_PHOTO_FAILURE:
        case photoConstants.UPDATE_PHOTO_FAILURE:
        case photoConstants.DELETE_PHOTO_FAILURE:
            return {...state, isCrudPending: false};
        default:
            return state;
    }
};

export default photosReducer;