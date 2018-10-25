import * as React from 'react';
import {connect} from "react-redux";
import {IAlertState} from "../../reducers/alert.reducer";
import {alertActions, IAlertAction} from "../../actions/alert.actions";
import {Dispatch} from "redux";
import { routerHistory } from '../../helpers/history';
import {IAppState} from "../../reducers";

type AlertProps = {
    alert: IAlertState;
    close: () => void;
}

class AlertBox extends React.Component<AlertProps>{
    constructor(props: AlertProps) {
        super(props);

        routerHistory.listen((location: any, action: any) => {
            // clear alert on location change
            props.close();
        });
    }
    render() {
        const {alert, close} = this.props;

        return (
            <div>
                {alert.message &&
                <div role="alert" className={`ui-alert alert ${alert.type}`}>
                    <span>{alert.message}</span>
                    <button className="close" onClick={close.bind(this)}>
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                }
            </div>
        );
    }
}

function mapStateToProps(state: IAppState) {
    const { alert } = state;
    return {
        alert
    }
}
function mapDispatchToProps(dispatch: Dispatch<IAlertAction>) {
    return {
        close: () => dispatch(alertActions.clear())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlertBox);
