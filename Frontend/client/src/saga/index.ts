import {all} from "redux-saga/effects";
import {authSaga} from "./auth.saga";
import {storySaga} from "./story.saga";
import {peopleSaga} from "./people.saga";
import {photosSaga} from "./photo.saga";


export function* rootSaga(): any {
    yield all([
        authSaga(),
        storySaga(),
        peopleSaga(),
        photosSaga()
    ]);
}