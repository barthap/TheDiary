import {takeEvery} from "redux-saga/effects";
import {authConstants} from "../consts/auth.constants";
import {all, put} from "redux-saga/effects";
import {authActions, ILoginAction} from "../actions/auth.actions";
import {User} from "../helpers/user";
import * as authService from '../service/auth.service';
import {routerHistory} from "../helpers/history";

const watchLogin = function* () {
    yield takeEvery(authConstants.LOGIN, function* (action: ILoginAction) {
        yield put(authActions.loginPending());
        try {
            const {username, password} = action.payload;
            const userInfo: User = yield authService.login(username, password);

            yield put(authActions.loginSuccess(userInfo));
            yield routerHistory.push('/');
        } catch (e) {
            console.warn("Login error", e);

            yield put(authActions.loginFailure());
        }
    });
};

const watchLogout = function* () {
    yield takeEvery(authConstants.LOGOUT, function* () {
        yield authService.logout();
    });
};


export const authSaga = function* () {
    yield all([
        watchLogin(),
        watchLogout()
    ]);
};