import {ActionCreator, Action} from "redux";
import {PageConfig, Person} from "../types";
import {
    ADD_PERSON,
    ADD_PERSON_STATUS, DELETE_PERSON, DELETE_PERSON_STATUS,
    FETCH_PEOPLE,
    FETCH_PEOPLE_STATUS,
    personConstants, SAVE_FETCHED, UPDATE_PERSON, UPDATE_PERSON_STATUS
} from "../consts/person.constants";

export interface FetchPeopleAction extends Action {
    type: FETCH_PEOPLE;
    payload?: PageConfig;
}
export interface FetchPeopleStatus extends Action {
    type: FETCH_PEOPLE_STATUS;
    payload?: Person[];
}

export interface SaveFetched extends Action {
    type: SAVE_FETCHED,
    payload: Person;
}

export interface AddPersonAction extends Action {
    type: ADD_PERSON;
    payload: Person;
}
export interface AddPersonStatus extends Action {
    type: ADD_PERSON_STATUS;
    payload?: Person;   //saved person retrieved from server
}

export interface UpdatePersonAction extends Action {
    type: UPDATE_PERSON;
    payload: Person;
}
export interface UpdatePersonStatus extends Action {
    type: UPDATE_PERSON_STATUS,
    payload?: Person;
}

type Id = number;
export interface DeletePersonAction extends Action {
    type:DELETE_PERSON,
    payload: Id;
}
export interface DeletePersonStatus extends Action {
    type: DELETE_PERSON_STATUS,
    payload?: Id;
}

const fetchPeople: ActionCreator<FetchPeopleAction> = (pageable: PageConfig = null) => ({
    type: personConstants.FETCH_PEOPLE,
    payload: pageable
});
const fetchSuccess: ActionCreator<FetchPeopleStatus> = (items: Person[]) => ({
    type: personConstants.FETCH_PEOPLE_SUCCESS,
    payload: items
});
const fetchFailure: ActionCreator<FetchPeopleStatus> = () => ({type: personConstants.FETCH_PEOPLE_FAILURE});
const fetchPending: ActionCreator<FetchPeopleStatus> = () => ({ type: personConstants.FETCH_PEOPLE_PENDING });

const saveFetched: ActionCreator<SaveFetched> = (payload: Person) => ({
    type: personConstants.SAVE_FETCHED,
    payload
});

const addPerson: ActionCreator<AddPersonAction> = (person: Person) => ({
    type: personConstants.ADD_PERSON,
    payload: person
});
const addPersonSuccess: ActionCreator<AddPersonStatus> = (person: Person) => ({
    type: personConstants.ADD_PERSON_SUCCESS,
    payload: person
});
const addPersonFailure: ActionCreator<AddPersonStatus> = () => ({type: personConstants.ADD_PERSON_FAILURE});
const addPersonPending: ActionCreator<AddPersonStatus> = () => ({type: personConstants.ADD_PERSON_PENDING});


const updatePerson: ActionCreator<UpdatePersonAction> = (person: Person) => ({
    type: personConstants.UPDATE_PERSON,
    payload: person
});
const updatePersonSuccess: ActionCreator<UpdatePersonStatus> = (person: Person) => ({
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