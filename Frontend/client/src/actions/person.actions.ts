import {ActionCreator, Action} from "redux";
import {PageConfig, Person} from "../types";
import {
    ADD_PERSON,
    ADD_PERSON_STATUS,
    FETCH_PEOPLE,
    FETCH_PEOPLE_STATUS,
    personConstants, SAVE_FETCHED
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

export interface AddPerson extends Action {
    type: ADD_PERSON;
    payload: Person;
}
export interface AddPersonStatus extends Action {
    type: ADD_PERSON_STATUS;
    payload?: Person;   //saved person retrieved from server
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


const addPerson: ActionCreator<AddPerson> = (person: Person) => ({
    type: personConstants.ADD_PERSON,
    payload: person
});

const addPersonSuccess: ActionCreator<AddPersonStatus> = (person: Person) => ({
    type: personConstants.ADD_PERSON_SUCCESS,
    payload: person
});
const addPersonFailure: ActionCreator<AddPersonStatus> = () => ({type: personConstants.ADD_PERSON_FAILURE});
const addPersonPending: ActionCreator<AddPersonStatus> = () => ({type: personConstants.ADD_PERSON_PENDING});


const saveFetched: ActionCreator<SaveFetched> = (payload: Person) => ({
    type: personConstants.SAVE_FETCHED,
    payload
});


export const personActions = {
    fetchPeople,    //fetch page of people from server
    fetchPending,
    fetchSuccess,
    fetchFailure,

    addPerson,          //adds person and saves on server
    addPersonSuccess,
    addPersonFailure,
    addPersonPending,

    saveFetched     //adds already-fetched person to redux store
};