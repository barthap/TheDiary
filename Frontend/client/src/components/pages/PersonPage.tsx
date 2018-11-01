import * as React from 'react';
import * as service from '../../service/people.service';
import {IPerson} from "../../helpers/types";
import {PersonForm} from "../ui/Person/PersonForm";
import {RouteComponentProps} from "react-router";
import {Dispatch} from "redux";
import {alertActions, IAlertAction} from "../../actions/alert.actions";
import {connect} from "react-redux";
import {IAppState} from "../../reducers";
import {PersonView} from '../ui/Person/PersonView';
import {personActions} from "../../actions/person.actions";
import {Toolbar} from "../ui/Toolbar";
import {EditButton} from "../ui/Button/EditButton";
import {DeleteButton} from "../ui/Button/DeleteButton";
import {PersonCollection} from "../../reducers/people.reducer";

type PersonPageState = {
    person?: IPerson;    //IPerson object needed for this component only
    isFetching: boolean;
    isEditing: boolean;
}

type ReduxInjectedProps = {
    showErrorAlert: (message: string) => void;
    saveFetchedPerson: (payload: IPerson) => void;
    deletePerson: (id: number) => void;
    updatePerson: (payload: IPerson) => void;
    loadedPeople: PersonCollection;
    isCrudPending: boolean;
}
type PersonPageProps = RouteComponentProps<{id: string}> & ReduxInjectedProps
class PersonPage extends React.Component<PersonPageProps, PersonPageState>{

    constructor(props: PersonPageProps) {
        super(props);

        this.state = {
            person: null,
            isFetching: false,
            isEditing: false
        };

        this.handleEdit = this.handleEdit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    public componentDidMount() {
        this.loadPerson();
    }

    componentDidUpdate(prevProps: Readonly<PersonPageProps>, prevState: Readonly<PersonPageState>, snapshot?: any): void {
        if(prevProps.match.params.id !== this.props.match.params.id)
            this.loadPerson();
    }

    public render() {
        const { person, isFetching, isEditing } = this.state;

        if(isFetching)
            return <h2>Loading...</h2>;
        else if(!person)
            return <h1>An error occurred</h1>;

        return (
            <main role="main">
                <h1>{person && person.fullName || 'IPerson'}</h1>
                {this.props.isCrudPending && <h2>Updating...</h2>}

                {!isEditing &&
                    <Toolbar>
                        <EditButton onClick={this.handleEdit}/>
                        <DeleteButton onClick={this.handleDelete}/>
                    </Toolbar>
                }

                {!isEditing ?
                    <PersonView person={person}/> :
                    <PersonForm onSave={this.handleSave}
                                onCancel={this.handleCancel}
                                data={person}
                                title="Edit person"/>
                }
            </main>
        );
    }

    private handleEdit() { this.setState({isEditing: true })}
    private handleCancel() { this.setState( {isEditing: false})}
    private handleDelete() {
        this.props.history.goBack();
        this.props.deletePerson(this.state.person.id);
    }

    private handleSave(formResult: IPerson) {
        this.setState({isEditing: false, person: formResult});
        this.props.updatePerson(formResult);
    }

    private loadPerson() {
        const id = parseInt(this.props.match.params.id);
        if(this.state.person && this.state.person.id === id)
            return;

        const result = this.props.loadedPeople.Get(this.props.match.params.id);
        if(result != null)
            this.setState({person: result});
        else
            this.fetchPerson(id);
    }

    // This fetch is needed for THIS component only so we fetch it here, not in redux
    private fetchPerson(id: number) {
        const that = this;
        this.setState({isFetching: true});
        service.fetchSinglePerson(id)
            .then(res => {
                that.setState({person: res, isFetching: false});

                /*
                The reason not to do that is when I go to PersonPage from URL,
                then only this one person will be loaded to store, and the List page will show only one record
                It will not refresh
                 */
                //that.props.saveFetchedPerson(res);  //adds fetched person to redux store
            })
            .catch(err => {
                that.setState({isFetching: false});
                console.log("Err", err);
                that.props.showErrorAlert("Could not load person!");
            });
    }
}

const mapStateToProps = (state: IAppState) => ({
    loadedPeople: state.people.items,
    isCrudPending: state.people.isCrudPending
});

const mapDispatchToProps = (dispatch: Dispatch<IAlertAction>) => ({
    showErrorAlert: (message: string) => dispatch(alertActions.error(message)),
    saveFetchedPerson: (payload: IPerson) => dispatch(personActions.saveFetched(payload)),
    deletePerson: (payload: number) => dispatch(personActions.deletePerson(payload)),
    updatePerson: (payload: IPerson) => dispatch(personActions.updatePerson(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonPage);