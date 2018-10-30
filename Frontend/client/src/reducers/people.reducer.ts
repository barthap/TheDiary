import {IPerson} from "../helpers/types";
import {Reducer} from "redux";
import {personConstants} from "../consts/person.constants";

export interface IPeopleState {
    items: IPerson[];
    fetching: boolean;
    isCrudPending: boolean;
}

const initialState: IPeopleState = {
    items: [],
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
            return {...state, fetching: false, items: action.payload};
        case personConstants.ADD_PERSON_SUCCESS:
            return {...state, items: state.items.concat(action.payload), isCrudPending: false};
        case personConstants.UPDATE_PERSON_SUCCESS:
            return {...state, isCrudPending: false,
                items: state.items.filter(p=>p.id !== action.payload.id)
                    .concat(action.payload)
            };
        case personConstants.DELETE_PERSON_SUCCESS:
            return {...state, isCrudPending: false,
                items: state.items.filter(p=>p.id !== action.payload)
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