export const authConstants = {
    REGISTER_PENDING: 'USERS_REGISTER_PENDING',
    REGISTER_SUCCESS: 'USERS_REGISTER_SUCCESS',
    REGISTER_FAILURE: 'USERS_REGISTER_FAILURE',

    LOGIN: 'USERS_LOGIN_REQUEST',
    LOGIN_PENDING: 'USERS_LOGIN_PENDING',
    LOGIN_SUCCESS: 'USERS_LOGIN_SUCCESS',
    LOGIN_FAILURE: 'USERS_LOGIN_FAILURE',

    LOGOUT: 'USERS_LOGOUT',
};

export type LOGIN = typeof authConstants.LOGIN;
export type LOGIN_PENDING = typeof authConstants.LOGIN_PENDING;
export type LOGIN_SUCCESS = typeof authConstants.LOGIN_SUCCESS;
export type LOGIN_FAILURE = typeof authConstants.LOGIN_FAILURE;
export type LOGOUT = typeof authConstants.LOGOUT;

export type LOGIN_STATUS = LOGIN_SUCCESS | LOGIN_FAILURE | LOGIN_PENDING;