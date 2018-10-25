import {Person} from "../types";
import {Reducer} from "redux";
import {AddPersonStatus, FetchPeopleStatus, SaveFetched} from "../actions/person.actions";
import {personConstants} from "../consts/person.constants";
import * as util from '../helpers/utils';

export interface IPeopleState {
    items: Person[];
    fetching: boolean;
}

const initialState: IPeopleState = {
    items: [],
    fetching: false
};

const peopleReducer: Reducer<IPeopleState> = (state: IPeopleState = initialState, action) => {
    switch (action.type) {
        case personConstants.FETCH_PEOPLE_PENDING:
            return {...state, fetching: true};
        case personConstants.FETCH_PEOPLE_FAILURE:
            return {...state, fetching: false};
        case personConstants.FETCH_PEOPLE_SUCCESS:
            return {...state, fetching: false, items: action.payload};
        case personConstants.SAVE_FETCHED:
            return {...state, items: util.appendAndCopy(state.items, action.payload)};
        default:
            return state;
    }
};

export default peopleReducer;