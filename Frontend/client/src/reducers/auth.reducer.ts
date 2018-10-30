import {User} from "../helpers/user";
import {authConstants} from "../consts/auth.constants";
import {IAuthAction} from "../actions/auth.actions";
import {checkForSavedUser} from "../helpers/api";

export enum LoginStatus {
    NOTHING,
    PENDING,
    SUCCESS,
    FAIL
}

export interface IAuthState {
    user?: User,
    isLoggedIn: boolean;
    status: LoginStatus;
}

function getInitialState(): IAuthState {
    const user: User = checkForSavedUser();
    if(user != null) {
        return {
            user: user,
            isLoggedIn: true,
            status: LoginStatus.NOTHING
        }
    }

    return {
        user: null,
        isLoggedIn: false,
        status: LoginStatus.NOTHING
    }
}


export default function authReducer(state: IAuthState = getInitialState(), action: IAuthAction): IAuthState {
    switch (action.type) {
        case authConstants.LOGIN_PENDING:
            return {...state, status: LoginStatus.PENDING};
        case authConstants.LOGIN_SUCCESS:
            return {
                ...state,
                status: LoginStatus.SUCCESS,
                isLoggedIn: true,
                user: action.payload
            };
        case authConstants.LOGIN_FAILURE:
            return {
                ...state,
                status: LoginStatus.FAIL,
                isLoggedIn: false,
                user: null
            };
        case authConstants.LOGOUT:
            return {
                ...state,
                status: LoginStatus.NOTHING,
                isLoggedIn: false,
                user: null
            };
        default:
            return state
    }
}