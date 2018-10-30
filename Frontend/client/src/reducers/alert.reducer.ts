import {alertConstants} from "../consts/alert.constants";
import {IAlertAction} from "../actions/alert.actions";

export interface IAlertState {
    type?: string;
    message?: string;
}

export default function alert(state: IAlertState = {}, action: IAlertAction): IAlertState {
    switch (action.type) {
        case alertConstants.SUCCESS:
            return {
                type: 'alert-success',
                message: action.message
            };
        case alertConstants.ERROR:
            return {
                type: 'alert-danger',
                message: action.message
            };
        case alertConstants.INFO:
            return {
                type: 'alert-info',
                message: action.message
            };
        case alertConstants.CLEAR:
            return {};
        default:
            return state
    }
}