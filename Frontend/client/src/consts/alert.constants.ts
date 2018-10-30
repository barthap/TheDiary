export const alertConstants = {
    SUCCESS: 'ALERT_SUCCESS',
    ERROR: 'ALERT_ERROR',
    INFO: 'ALERT_INFO',
    CLEAR: 'ALERT_CLEAR'
};

export type ALERT_SUCCESS = typeof alertConstants.SUCCESS;
export type ALERT_ERROR = typeof alertConstants.ERROR;
export type ALERT_INFO = typeof alertConstants.INFO;
export type ALERT_CLEAR = typeof alertConstants.CLEAR;

export type ALERT_ACTION_TYPE = ALERT_SUCCESS | ALERT_ERROR | ALERT_INFO | ALERT_CLEAR;