import * as React from 'react';
import {IPeopleState} from "../../reducers/people.reducer";
import {IAppState} from "../../reducers";
import {Dispatch} from "redux";
import {FetchPeopleAction, personActions} from "../../actions/person.actions";
import {connect} from "react-redux";
import {FilterablePersonList} from "../ui/FilterablePersonList";

type PeoplePageProps = {
    peopleState: IPeopleState;
    fetchPeople: () => void;
}

class PeoplePage extends React.Component<PeoplePageProps>{
    constructor(props: PeoplePageProps) {
        super(props);

        if(this.props.peopleState.items.length === 0)
            props.fetchPeople();
    }

    public render() {
        const { items, fetching } = this.props.peopleState;
        return (
            <main role="main">
               <h1>People</h1>
                <div role="group" className="btn-group">
                    <button className="btn btn-primary" type="button">
                        <span className="glyphicon glyphicon-plus"/> Add
                    </button>
                </div>
                {fetching ? <p>Loading...</p> :
                    <FilterablePersonList people={items}/>
                }
            </main>
        );
    }
}

const mapStateToProps = (state: IAppState) => ({ peopleState: state.people });
const mapDispatchToProps = (dispatch: Dispatch<FetchPeopleAction>) => ({
    fetchPeople: () => dispatch(personActions.fetchPeople())
});

export default connect(mapStateToProps, mapDispatchToProps)(PeoplePage);