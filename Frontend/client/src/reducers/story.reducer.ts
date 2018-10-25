import {Story} from "../types";
import {storyConstants} from "../consts/story.constants";
import {IFetchStoriesStatus} from "../actions/story.actions";
import {Reducer} from "redux";
import {normalizeArray} from "../helpers/utils";


export type StoryItems = { [key: number]: Story}

export interface IStoryState {
    items: StoryItems;
    fetching: boolean;
}

const initialState: IStoryState = {
    items: [],
    fetching: false
};

const storyReducer: Reducer<IStoryState> = (state: IStoryState = initialState, action: IFetchStoriesStatus) => {
    switch (action.type) {
        case storyConstants.FETCH_STORIES_PENDING:
            return {...state, fetching: true};
        case storyConstants.FETCH_STORIES_FAILURE:
            return {...state, fetching: false};
        case storyConstants.FETCH_STORIES_SUCCESS:
            return {...state, fetching: false, items: normalizeArray(action.payload, 'id')};
        default:
            return state;
    }
};

export default storyReducer;