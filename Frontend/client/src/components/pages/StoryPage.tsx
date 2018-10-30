import * as React from 'react';
import {connect} from "react-redux";
import {IAppState} from "../../reducers";
import {Action, Dispatch} from "redux";
import {IStoryState} from "../../reducers/story.reducer";
import {storyActions} from "../../actions/story.actions";
import {SingleStory} from "../ui/Story/SingleStory";
import {IStory} from "../../helpers/types";
import {StoryForm} from "../ui/Story/StoryForm";
import {CreateButton} from "../ui/Button/CreateButton";

type StoryPageProps = {
    storyState: IStoryState;
    fetchStories: () => void;
    addStory: (payload: IStory) => void;
    updateStory: (payload: IStory) => void;
    deleteStory: (id: number) => void;
}

type State = {
    isCreating: boolean;
}

const sortChronologically = (a: IStory, b: IStory) => {
    if (a.happenedDate > b.happenedDate) return 1;
    if (a.happenedDate < b.happenedDate) return -1;
    return 0;
};

class StoryPage extends React.Component<StoryPageProps, State> {
    public constructor(props: StoryPageProps) {
        super(props);

        props.fetchStories();

        this.state = {
            isCreating: false
        };

        this.handleCancel = this.handleCancel.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
    }

    public render() {
        const { updateStory, deleteStory, storyState } = this.props;
        const { items, fetching } = storyState;
        const stories = items.Values().sort(sortChronologically);

        return (
            <main role="main" className="container-fluid">
                <h1> Stories</h1>
                {this.renderCreator()}
                {fetching ? <h4>Loading...</h4> :
                stories.map(s =>
                    <div key={s.id}>
                        <SingleStory onSave={updateStory} onDelete={deleteStory} story={s}/>
                        <hr/>
                    </div>
                )}
                {!fetching && stories.length === 0 && <p>No stories yet!</p>}
            </main>
        );
    }

    private renderCreator() {
        if(this.props.storyState.isCrudPending)
            return <h4>Updating...</h4>;
        if(!this.state.isCreating)
            return <CreateButton onClick={this.handleCreate}/>;

        return <div className="container-fluid well-lg">
            <StoryForm title="Add new story"
                       className="beige-bg well-lg"
                          onCancel={this.handleCancel}
                          onSave={this.handleSave}/>
        </div>
    }

    private handleCreate() { this.setState({isCreating: true}) }
    private handleCancel() { this.setState({isCreating: false}) }
    private handleSave(newStory: IStory) {
        this.setState({isCreating: false});
        this.props.addStory(newStory);
    }
}

const mapStateToProps = (state: IAppState) => ({
    storyState: state.story
});
const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    fetchStories: () => dispatch(storyActions.fetchStories()),
    addStory: (payload: IStory) => dispatch(storyActions.addStory(payload)),
    updateStory: (payload: IStory) => dispatch(storyActions.updateStory(payload)),
    deleteStory: (id: number) => dispatch(storyActions.deleteStory(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(StoryPage);
