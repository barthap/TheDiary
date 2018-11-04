import * as React from 'react';
import {IPeopleState} from "../../reducers/people.reducer";
import {IAppState} from "../../reducers";
import {personActions} from "../../actions/person.actions";
import {connect, DispatchProp} from "react-redux";
import {FilterablePersonList} from "../ui/Person/FilterablePersonList";
import {Link} from "react-router-dom";
import {Toolbar} from "../ui/Toolbar";
import {CreateButton} from "../ui/Button/CreateButton";
import {PageRequest} from "../../helpers/pagination";
import {PropagateLoader, SyncLoader} from "react-spinners";

type PeoplePageProps = {
    peopleState: IPeopleState;
}

type Props = PeoplePageProps & DispatchProp;
class PeoplePage extends React.Component<Props>{
    constructor(props: Props) {
        super(props);

        if(props.peopleState.items.Count() === 0)
            props.dispatch(personActions.fetchPeople(new PageRequest()));
    }

    public render() {

        return (
            <main role="main">
               <h1>People</h1>
                <Toolbar className="m-b">
                    <Link to="/people/add">
                        <CreateButton />
                    </Link>
                </Toolbar>
                {this.renderBody()}
            </main>
        );
    }

    private renderBody() {
        const { items, fetching, isCrudPending, error } = this.props.peopleState;

        if (error)
            return <h3>Error loading people</h3>;

        return <div>
            {isCrudPending && <div style={{margin: 15}}>
                <SyncLoader color="#00C1FF" size={8}/>
            </div>}
            {fetching ? <div>
                <h3>Loading...</h3>
                <div style={{marginLeft: '3em'}}>
                    <PropagateLoader color="#00C1FF"/>
                </div>
            </div> :
                <FilterablePersonList people={items.Values()}/>}
        </div>;

    }
}

const mapStateToProps = (state: IAppState) => ({ peopleState: state.people });

export default connect(mapStateToProps)(PeoplePage);