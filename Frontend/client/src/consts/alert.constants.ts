export const alertConstants = {
    SUCCESS: 'ALERT_SUCCESS',
    ERROR: 'ALERT_ERROR',
    CLEAR: 'ALERT_CLEAR'
};

export type ALERT_SUCCESS = typeof alertConstants.SUCCESS;
export type ALERT_ERROR = typeof alertConstants.ERROR;
export type ALERT_CLEAR = typeof alertConstants.CLEAR;

export type ALERT_ACTION_TYPE = ALERT_SUCCESS | ALERT_ERROR | ALERT_CLEAR;