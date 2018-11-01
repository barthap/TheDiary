import {all, put, takeEvery} from "redux-saga/effects";
import {IPerson, IPhoto} from "../helpers/types";
import * as photoService from '../service/photo.service';
import {photoConstants} from "../consts/photo.constants";
import {
    AddPhotoAction,
    FetchPhotosAction,
    photoActions,
} from "../actions/photo.actions";
import {alertActions} from "../actions/alert.actions";


const watchPhotosFetch = function* () {
    yield takeEvery(photoConstants.FETCH_PHOTOS, function* (action: FetchPhotosAction) {
        yield put(photoActions.fetchPending());
        try {
            const pageable = action.payload;
            const photos: IPhoto[] = yield photoService.fetchPhotos(pageable);

            yield put(photoActions.fetchSuccess(photos));
        } catch (e) {
            console.warn("Fetch photos error", e);

            yield put(photoActions.fetchFailure());
        }

    });
};


const watchAddPhoto = function* () {
    yield takeEvery(photoConstants.ADD_PHOTO, function* (action: AddPhotoAction) {
        yield put(photoActions.addPhotoPending());
        try {
            const { file, title } = action.payload;
            yield photoService.uploadPhoto(file, title)
                .catch(e => {
                    throw e;
                });

            yield put(photoActions.addPhotoSuccess());
            yield put(alertActions.success("Added photo"));
        } catch (e) {
            console.warn("Add photo error", e);
            yield put(photoActions.addPhotoFailure());
            yield put(alertActions.error("Adding photo failed"));
        }

    });
};
/*
const watchUpdatePerson = function* () {
    yield takeEvery(photoConstants.UPDATE_PERSON, function* (action: UpdatePersonAction) {
        yield put(photoActions.updatePersonPending());
        try {
            const { payload } = action;
            if(!payload || !payload.id || payload.id < 1)
                throw "Invalid ID";
            const result: IPerson = yield peopleService.updatePerson(payload.id, payload)
                .catch(e => {
                    throw e;
                });

            yield put(photoActions.updatePersonSuccess(result));
            yield put(alertActions.success("IPerson updated successfully"));
        } catch (e) {
            console.warn("Update photo error", e);
            yield put(photoActions.updatePersonFailure());
            yield put(alertActions.error("Updating photo failed"));
        }

    });
};

const watchDeletePerson = function* () {
    yield takeEvery(photoConstants.DELETE_PERSON, function* (action: DeletePersonAction) {
        yield put(photoActions.deletePersonPending());
        try {
            yield peopleService.deletePerson(action.payload)
                .catch(e=> {throw e;});

            yield put(photoActions.deletePersonSuccess(action.payload));
        } catch (e) {
            console.warn("Delete photo error", e);
            yield put(photoActions.deletePersonFailure());
            yield put(alertActions.error("Could not delete photo!"));
        }
    });
};*/

export const photosSaga = function* () {
    yield all([
        watchPhotosFetch(),
        watchAddPhoto()
    ]);
};