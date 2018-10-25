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

type PersonPageState = {
    person?: Person;
    isFetching: boolean;
    isEditing: boolean;
}

type ReduxInjectedProps = {
    showErrorAlert: (message: string) => void;
    saveFetchedPerson: (payload: Person) => void;
    loadedPeople: Person[];
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
    }

    public componentWillMount() {
        const id = parseInt(this.props.match.params.id);
        if(this.state.person && this.state.person.id === id)
            return;
        this.loadPerson(id);
    }

    public render() {
        const { person, isFetching, isEditing } = this.state;

        if(isFetching)
            return <h2>Loading...</h2>;
        else if(!person)
            return <h1>An error occurred</h1>;

        return (
            <main role="main">
                <h1>{person && person.fullName || 'Person'}</h1>

                {!isEditing && <div role="group" className="btn-group">
                    <button className="btn btn-primary" type="button"
                        onClick={this.handleEdit}>
                        <span className="glyphicon glyphicon-pencil"/> Edit
                    </button>
                    <button className="btn btn-danger" type="button">
                        <span className="glyphicon glyphicon-trash"/> Delete
                    </button>
                </div> }

                {!isEditing ?
                    <PersonView person={person}/> :
                    <PersonForm onSave={()=>{}}
                                onCancel={this.handleCancel}
                                data={person}/>
                }
            </main>
        );
    }

    private handleEdit() { this.setState({isEditing: true })}
    private handleCancel() { this.setState( {isEditing: false})}

    private loadPerson(id: number) {
        const result = this.props.loadedPeople.find(e => e.id === id);
        if(result != null)
            this.setState({person: result});
        else
            this.fetchPerson(id);
    }

    private fetchPerson(id: number) {
        this.setState({isFetching: true});
        service.fetchSinglePerson(id)
            .then(res => {
                this.setState({person: res, isFetching: false});
                this.props.saveFetchedPerson(res);  //adds fetched person to redux store
            })
            .catch(err => {
                this.setState({isFetching: false});
                console.log("Err", err);
                this.props.showErrorAlert("Could not load person!");
            });
    }
}

const mapStateToProps = (state: IAppState) => ({
    loadedPeople: state.people.items
});

const mapDispatchToProps = (dispatch: Dispatch<IAlertAction>) => ({
    showErrorAlert: (message: string) => dispatch(alertActions.error(message)),
    saveFetchedPerson: (payload: Person) => dispatch(personActions.saveFetched(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonPage);