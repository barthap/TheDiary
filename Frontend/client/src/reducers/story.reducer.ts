import {IStory} from "../helpers/types";
import {storyConstants} from "../consts/story.constants";
import {Reducer} from "redux";
import {IndexedCollection, IndexedDictionary} from "../helpers/Dictionary";


export type StoryItems = IndexedCollection<IStory>;

export interface IStoryState {
    items: StoryItems;
    fetching: boolean;
    isCrudPending: boolean;
    error: boolean;
}

const initialState: IStoryState = {
    items: new IndexedDictionary<IStory>('id'),
    fetching: false,
    isCrudPending: false,
    error: false
};

const storyReducer: Reducer<IStoryState> = (state: IStoryState = initialState, action) => {
    const { payload } = action;
    switch (action.type) {
        //FETCH
        case storyConstants.FETCH_STORIES_PENDING:
            return {...state, fetching: true, error: false};
        case storyConstants.FETCH_STORIES_FAILURE:
            return {...state, fetching: false, error: true};
        case storyConstants.FETCH_STORIES_SUCCESS:
            return {...state, fetching: false,
                items: new IndexedDictionary<IStory>('id', payload)
            };

        //CRUD SUCCESS
        case storyConstants.UPDATE_STORY_SUCCESS:
        case storyConstants.ADD_STORY_SUCCESS:
            return {...state, isCrudPending: false,
                items: state.items.Set(payload)};
        case storyConstants.DELETE_STORY_SUCCESS:
            return {...state, isCrudPending: false,
                items: state.items.Remove(payload)
            };

        //CRUD PENDING
        case storyConstants.UPDATE_STORY_PENDING:
        case storyConstants.ADD_STORY_PENDING:
        case storyConstants.DELETE_STORY_PENDING:
            return {...state, isCrudPending: true};

        //CRUD FAILURE
        case storyConstants.ADD_STORY_FAILURE:
        case storyConstants.UPDATE_STORY_FAILURE:
        case storyConstants.DELETE_STORY_FAILURE:
            return {...state, isCrudPending: false};
        default:
            return state;

    }
};

export default storyReducer;