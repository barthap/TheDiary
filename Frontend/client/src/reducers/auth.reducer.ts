import {User} from "../helpers/user";
import {authConstants} from "../consts/auth.constants";
import {IAuthAction} from "../actions/auth.actions";
import {checkForSavedUser} from "../helpers/api";

enum Status {
    NOTHING,
    PENDING,
    SUCCESS,
    FAIL
}

export interface IAuthState {
    user?: User,
    isLoggedIn: boolean;
    status: Status;
}

function getInitialState(): IAuthState {
    const user: User = checkForSavedUser();
    if(user != null) {
        return {
            user: user,
            isLoggedIn: true,
            status: Status.NOTHING
        }
    }

    return {
        user: null,
        isLoggedIn: false,
        status: Status.NOTHING
    }
}


export default function authReducer(state: IAuthState = getInitialState(), action: IAuthAction): IAuthState {
    switch (action.type) {
        case authConstants.LOGIN_PENDING:
            return {...state, status: Status.PENDING};
        case authConstants.LOGIN_SUCCESS:
            return {
                ...state,
                status: Status.SUCCESS,
                isLoggedIn: true,
                user: action.payload
            };
        case authConstants.LOGIN_FAILURE:
            return {
                ...state,
                status: Status.FAIL,
                isLoggedIn: false,
                user: null
            };
        case authConstants.LOGOUT:
            return {
                ...state,
                status: Status.NOTHING,
                isLoggedIn: false,
                user: null
            };
        default:
            return state
    }
}