import {ActionCreator} from "redux";
import {FETCH_STORIES, FETCH_STORIES_STATUS, storyConstants} from "../consts/story.constants";
import {PageConfig, Story} from "../types";



export interface IFetchStoriesAction {
    type: FETCH_STORIES;
    payload?: PageConfig;
}

export interface IFetchStoriesStatus {
    type: FETCH_STORIES_STATUS;
    payload?: Story[];
}

const fetchStories: ActionCreator<IFetchStoriesAction> = (pageable: PageConfig = null) => ({
    type: storyConstants.FETCH_STORIES,
    payload: pageable
});

const fetchSuccess: ActionCreator<IFetchStoriesStatus> = (items: Story[]) => ({
    type: storyConstants.FETCH_STORIES_SUCCESS,
    payload: items
});

const fetchFailure: ActionCreator<IFetchStoriesStatus> = () => ({
    type: storyConstants.FETCH_STORIES_FAILURE
});

const fetchPending: ActionCreator<IFetchStoriesStatus> = () => ({
    type: storyConstants.FETCH_STORIES_PENDING
});

export const storyActions = {
    fetchStories,
    fetchPending,
    fetchSuccess,
    fetchFailure
};