import {ActionCreator, Action} from "redux";
import {IPerson} from "../helpers/types";
import {
    ADD_PERSON,
    ADD_PERSON_STATUS, DELETE_PERSON, DELETE_PERSON_STATUS,
    FETCH_PEOPLE,
    FETCH_PEOPLE_STATUS,
    personConstants, SAVE_FETCHED, UPDATE_PERSON, UPDATE_PERSON_STATUS
} from "../consts/person.constants";
import {IPageConfig} from "../helpers/pagination";

export interface FetchPeopleAction extends Action {
    type: FETCH_PEOPLE;
    payload?: IPageConfig;
}
export interface FetchPeopleStatus extends Action {
    type: FETCH_PEOPLE_STATUS;
    payload?: IPerson[];
}

export interface AddPersonAction extends Action {
    type: ADD_PERSON;
    payload: IPerson;
}
export interface AddPersonStatus extends Action {
    type: ADD_PERSON_STATUS;
    payload?: IPerson;   //saved person retrieved from server
}

export interface UpdatePersonAction extends Action {
    type: UPDATE_PERSON;
    payload: IPerson;
}
export interface UpdatePersonStatus extends Action {
    type: UPDATE_PERSON_STATUS,
    payload?: IPerson;
}
type SaveFetchedAction = UpdatePersonStatus;

type Id = number;
export interface DeletePersonAction extends Action {
    type:DELETE_PERSON,
    payload: Id;
}
export interface DeletePersonStatus extends Action {
    type: DELETE_PERSON_STATUS,
    payload?: Id;
}

const fetchPeople: ActionCreator<FetchPeopleAction> = (pageable: IPageConfig = null) => ({
    type: personConstants.FETCH_PEOPLE,
    payload: pageable
});
const fetchSuccess: ActionCreator<FetchPeopleStatus> = (items: IPerson[]) => ({
    type: personConstants.FETCH_PEOPLE_SUCCESS,
    payload: items
});
const fetchFailure: ActionCreator<FetchPeopleStatus> = () => ({type: personConstants.FETCH_PEOPLE_FAILURE});
const fetchPending: ActionCreator<FetchPeopleStatus> = () => ({ type: personConstants.FETCH_PEOPLE_PENDING });


const addPerson: ActionCreator<AddPersonAction> = (person: IPerson) => ({
    type: personConstants.ADD_PERSON,
    payload: person
});
const addPersonSuccess: ActionCreator<AddPersonStatus> = (person: IPerson) => ({
    type: personConstants.ADD_PERSON_SUCCESS,
    payload: person
});
const addPersonFailure: ActionCreator<AddPersonStatus> = () => ({type: personConstants.ADD_PERSON_FAILURE});
const addPersonPending: ActionCreator<AddPersonStatus> = () => ({type: personConstants.ADD_PERSON_PENDING});
const saveFetched: ActionCreator<SaveFetchedAction> = addPersonSuccess;

const updatePerson: ActionCreator<UpdatePersonAction> = (person: IPerson) => ({
    type: personConstants.UPDATE_PERSON,
    payload: person
});
const updatePersonSuccess: ActionCreator<UpdatePersonStatus> = (person: IPerson) => ({
    type: personConstants.UPDATE_PERSON_SUCCESS,
    payload: person
});
const updatePersonFailure: ActionCreator<UpdatePersonStatus> = () => ({type: personConstants.UPDATE_PERSON_FAILURE});
const updatePersonPending: ActionCreator<UpdatePersonStatus> = () => ({type: personConstants.UPDATE_PERSON_PENDING});

const deletePerson: ActionCreator<DeletePersonAction> = (payload: Id) => ({
    type: personConstants.DELETE_PERSON,
    payload
});
const deletePersonSuccess: ActionCreator<DeletePersonStatus> = (payload: Id) => ({
    type: personConstants.DELETE_PERSON_SUCCESS,
    payload
});
const deletePersonFailure: ActionCreator<DeletePersonStatus> = () => ({type: personConstants.DELETE_PERSON_FAILURE});
const deletePersonPending: ActionCreator<DeletePersonStatus> = () => ({type: personConstants.DELETE_PERSON_PENDING});


export const personActions = {
    fetchPeople,    //fetch page of people from server
    fetchPending,
    fetchSuccess,
    fetchFailure,

    saveFetched,     //adds already-fetched person to redux store

    addPerson,          //adds person and saves on server
    addPersonSuccess,
    addPersonFailure,
    addPersonPending,

    updatePerson,
    updatePersonSuccess,
    updatePersonFailure,
    updatePersonPending,

    deletePerson,
    deletePersonSuccess,
    deletePersonFailure,
    deletePersonPending
};