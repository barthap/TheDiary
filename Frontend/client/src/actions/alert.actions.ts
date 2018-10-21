import {ALERT_ACTION_TYPE, alertConstants} from "../consts/alert.constants";


export interface IAlertAction {
    type: ALERT_ACTION_TYPE;
    message?: string;
}

export const alertActions = {
    success,
    error,
    clear
};

function success(message: string): IAlertAction {
    return { type: alertConstants.SUCCESS, message };
}

function error(message: string): IAlertAction {
    return { type: alertConstants.ERROR, message };
}

function clear(): IAlertAction {
    return { type: alertConstants.CLEAR };
}