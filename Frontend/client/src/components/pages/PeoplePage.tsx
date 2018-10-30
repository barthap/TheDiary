import * as React from 'react';
import {IPeopleState} from "../../reducers/people.reducer";
import {IAppState} from "../../reducers";
import {Dispatch} from "redux";
import {FetchPeopleAction, personActions} from "../../actions/person.actions";
import {connect} from "react-redux";
import {FilterablePersonList} from "../ui/Person/FilterablePersonList";
import {Link} from "react-router-dom";
import {Toolbar} from "../ui/Toolbar";
import {CreateButton} from "../ui/Button/CreateButton";
import {PageRequest} from "../../helpers/pagination";

type PeoplePageProps = {
    peopleState: IPeopleState;
    fetchPeople: () => void;
}

class PeoplePage extends React.Component<PeoplePageProps>{
    constructor(props: PeoplePageProps) {
        super(props);

        if(props.peopleState.items.length === 0)
            props.fetchPeople();
    }

    public render() {
        const { items, fetching, isCrudPending } = this.props.peopleState;
        return (
            <main role="main">
               <h1>People</h1>
                <Toolbar className="m-b">
                    <Link to="/people/add">
                        <CreateButton />
                    </Link>
                </Toolbar>
                {isCrudPending && <h3>Updating...</h3>}
                {fetching ? <h3>Loading...</h3> :
                    <FilterablePersonList people={items}/>
                }
            </main>
        );
    }
}

const mapStateToProps = (state: IAppState) => ({ peopleState: state.people });
const mapDispatchToProps = (dispatch: Dispatch<FetchPeopleAction>) => ({
    fetchPeople: () => dispatch(personActions.fetchPeople(new PageRequest()))
});

export default connect(mapStateToProps, mapDispatchToProps)(PeoplePage);