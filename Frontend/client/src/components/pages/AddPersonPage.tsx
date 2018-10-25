import * as React from 'react';
import * as service from '../../service/people.service';
import {Person} from "../../types";
import {PersonForm} from "../ui/PersonForm";
import {RouteComponentProps} from "react-router";
import {Dispatch} from "redux";
import {alertActions, IAlertAction} from "../../actions/alert.actions";
import {connect} from "react-redux";
import {IAppState} from "../../reducers";
import {PersonView} from '../ui/PersonView';
import {personActions} from "../../actions/person.actions";


type ReduxInjectedProps = {
    showErrorAlert: (message: string) => void;
    savePerson: (payload: Person) => void;
}
type PersonPageProps = RouteComponentProps<{id: string}> & ReduxInjectedProps

class AddPersonPage extends React.Component<PersonPageProps>{

    constructor(props: PersonPageProps) {
        super(props);

        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    public render() {
        return (
            <main role="main">
                <h1>Add person</h1>
                    <PersonForm onSave={this.handleSave}
                                onCancel={this.handleCancel}
                                data={null}
                                title="Person details"/>
            </main>
        );
    }

    private handleSave(formResult: Person) {
        this.props.history.goBack();
        this.props.savePerson(formResult)
    }
    private handleCancel() { this.props.history.goBack(); }

}

const mapDispatchToProps = (dispatch: Dispatch<IAlertAction>) => ({
    savePerson: (payload: Person) => dispatch(personActions.addPerson(payload))
});

export default connect(null, mapDispatchToProps)(AddPersonPage);