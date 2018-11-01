import {IPerson} from "../helpers/types";
import {Reducer} from "redux";
import {personConstants} from "../consts/person.constants";
import {IndexedCollection, IndexedDictionary} from "../helpers/Dictionary";

export type PersonCollection = IndexedCollection<IPerson>;

export interface IPeopleState {
    items: PersonCollection;
    fetching: boolean;
    isCrudPending: boolean;
}

const initialState: IPeopleState = {
    items: new IndexedDictionary<IPerson>('id'),
    fetching: false,
    isCrudPending: false
};

const peopleReducer: Reducer<IPeopleState> = (state: IPeopleState = initialState, action) => {
    switch (action.type) {
        case personConstants.FETCH_PEOPLE_PENDING:
            return {...state, fetching: true};
        case personConstants.FETCH_PEOPLE_FAILURE:
            return {...state, fetching: false};
        case personConstants.FETCH_PEOPLE_SUCCESS:
            return {...state, fetching: false,
                items: new IndexedDictionary<IPerson>('id', action.payload)};
        case personConstants.ADD_PERSON_SUCCESS:
        case personConstants.UPDATE_PERSON_SUCCESS:
            return {...state, isCrudPending: false,
                items: state.items.Set(action.payload)
            };
        case personConstants.DELETE_PERSON_SUCCESS:
            return {...state, isCrudPending: false,
                items: state.items.Remove(action.payload)
            };
        case personConstants.UPDATE_PERSON_PENDING:
        case personConstants.ADD_PERSON_PENDING:
        case personConstants.DELETE_PERSON_PENDING:
            return {...state, isCrudPending: true};
        case personConstants.ADD_PERSON_FAILURE:
        case personConstants.UPDATE_PERSON_FAILURE:
        case personConstants.DELETE_PERSON_FAILURE:
            return {...state, isCrudPending: false};
        default:
            return state;
    }
};

export default peopleReducer;