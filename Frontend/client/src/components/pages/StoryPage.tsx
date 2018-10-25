import * as React from 'react';
import {connect} from "react-redux";
import {IAppState} from "../../reducers";
import {Dispatch} from "redux";
import {IStoryState} from "../../reducers/story.reducer";
import {IFetchStoriesAction, storyActions} from "../../actions/story.actions";
import {dictionaryValues} from "../../helpers/utils";

type StoryPageProps = {
    storyState: IStoryState;
    fetchStories: () => void;
}

class StoryPage extends React.Component<StoryPageProps> {
    public constructor(props: StoryPageProps) {
        super(props);

        props.fetchStories();
    }

    public render() {
        const { items, fetching } = this.props.storyState;
        //TODO: items are Dictionary, not array
        const stories = dictionaryValues(items);

        return (
            <main role="main">
                <h1> Stories</h1>

                {fetching ? <p>Loading...</p> :
                stories.map(i =>
                    <p key={i.id}><b>{i.header}</b><br/>{i.content}</p>
                )}

            </main>
        );
    }
}

const mapStateToProps = (state: IAppState) => ({
    storyState: state.story
});
const mapDispatchToProps = (dispatch: Dispatch<IFetchStoriesAction>) => ({
    fetchStories: () => dispatch(storyActions.fetchStories())
});

export default connect(mapStateToProps, mapDispatchToProps)(StoryPage);
