import {authConstants, LOGIN, LOGIN_STATUS, LOGOUT} from '../consts/auth.constants';
import {User} from "../helpers/user";
import {ActionCreator} from "redux";


export interface ILoginStatus {
    type: LOGIN_STATUS,
    payload?: User;
}

export interface Credentials {
    username: string;
    password: string;
}

export interface ILoginAction {
    type: LOGIN;
    payload: Credentials;
}

export interface ILogoutAction {
    type: LOGOUT;
    payload?: any;
}

export type IAuthAction = ILoginAction | ILoginStatus | ILogoutAction;

const doLogin: ActionCreator<ILoginAction> = (username: string, password: string) => {
    return {
        type: authConstants.LOGIN,
        payload: {
            username, password
        }
    }
};

const doLogout: ActionCreator<ILogoutAction> = () => {
    return {
        type: authConstants.LOGOUT
    }
};

const loginPending: ActionCreator<ILoginStatus> = () => ({
    type: authConstants.LOGIN_PENDING
});

const loginSuccess: ActionCreator<ILoginStatus> = (payload: User) => ({
    type: authConstants.LOGIN_SUCCESS, payload
});

const loginFailure: ActionCreator<ILoginStatus> = () => ({
    type: authConstants.LOGIN_FAILURE
});


export const authActions = {
    login: doLogin,
    logout: doLogout,
    loginPending,
    loginSuccess,
    loginFailure
};