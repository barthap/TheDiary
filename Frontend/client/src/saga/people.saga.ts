import {all, put, takeEvery} from "redux-saga/effects";
import {Person} from "../types";
import * as peopleService from '../service/people.service';
import {personConstants} from "../consts/person.constants";
import {
    AddPersonAction,
    DeletePersonAction,
    FetchPeopleAction,
    personActions,
    UpdatePersonAction
} from "../actions/person.actions";
import {alertActions} from "../actions/alert.actions";


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

const watchAddPerson = function* () {
    yield takeEvery(personConstants.ADD_PERSON, function* (action: AddPersonAction) {
        yield put(personActions.addPersonPending());
        try {
            const result: Person = yield peopleService.addPerson(action.payload)
                .catch(e => {
                    throw e;
                });

            yield put(personActions.addPersonSuccess(result));
            yield put(alertActions.success("Added person"));
        } catch (e) {
            console.warn("Add person error", e);
            yield put(personActions.addPersonFailure());
            yield put(alertActions.error("Adding person failed"));
        }

    });
};

const watchUpdatePerson = function* () {
    yield takeEvery(personConstants.UPDATE_PERSON, function* (action: UpdatePersonAction) {
        yield put(personActions.updatePersonPending());
        try {
            const { payload } = action;
            if(!payload || !payload.id || payload.id < 1)
                throw "Invalid ID";
            const result: Person = yield peopleService.updatePerson(payload.id, payload)
                .catch(e => {
                    throw e;
                });

            yield put(personActions.updatePersonSuccess(result));
            yield put(alertActions.success("Person updated successfully"));
        } catch (e) {
            console.warn("Update person error", e);
            yield put(personActions.updatePersonFailure());
            yield put(alertActions.error("Updating person failed"));
        }

    });
};

const watchDeletePerson = function* () {
    yield takeEvery(personConstants.DELETE_PERSON, function* (action: DeletePersonAction) {
        yield put(personActions.deletePersonPending());
        try {
            yield peopleService.deletePerson(action.payload)
                .catch(e=> {throw e;});

            yield put(personActions.deletePersonSuccess(action.payload));
        } catch (e) {
            console.warn("Delete person error", e);
            yield put(personActions.deletePersonFailure());
            yield put(alertActions.error("Could not delete person!"));
        }
    });
};

export const peopleSaga = function* () {
    yield all([
        watchPeopleFetch(),
        watchAddPerson(),
        watchUpdatePerson(),
        watchDeletePerson()
    ]);
};