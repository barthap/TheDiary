import {all, put, takeEvery} from "redux-saga/effects";
import {Person} from "../types";
import * as peopleService from '../service/people.service';
import {personConstants} from "../consts/person.constants";
import {FetchPeopleAction, personActions} from "../actions/person.actions";


const watchPeopleFetch = function* () {
    yield takeEvery(personConstants.FETCH_PEOPLE, function* (action: FetchPeopleAction) {
        yield put(personActions.fetchPending());
        try {
            const pageable = action.payload;
            const people: Person[] = yield peopleService.fetchPeople(pageable);

            yield put(personActions.fetchSuccess(people));
        } catch (e) {
            console.warn("Fetch people error", e);

            yield put(personActions.fetchFailure());
        }

    });
};


export const peopleSaga = function* () {
    yield all([
        watchPeopleFetch()
    ]);
};