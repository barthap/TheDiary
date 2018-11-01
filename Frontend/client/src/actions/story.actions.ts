import {Action, ActionCreator} from "redux";
import {
    ADD_STORY,
    ADD_STORY_STATUS,
    DELETE_STORY,
    DELETE_STORY_STATUS,
    FETCH_STORIES,
    FETCH_STORIES_STATUS,
    storyConstants,
    UPDATE_STORY,
    UPDATE_STORY_STATUS
} from "../consts/story.constants";
import {IStory} from "../helpers/types";
import {IPageConfig} from "../helpers/pagination";


export interface IFetchStoriesAction {
    type: FETCH_STORIES;
    payload?: IPageConfig;
}

export interface IFetchStoriesStatus {
    type: FETCH_STORIES_STATUS;
    payload?: IStory[];
}

export interface AddStoryAction extends Action {
    type: ADD_STORY;
    payload: IStory;
}
export interface AddStoryStatus extends Action {
    type: ADD_STORY_STATUS;
    payload?: IStory;   //saved story retrieved from server
}

export interface UpdateStoryAction extends Action {
    type: UPDATE_STORY;
    payload: IStory;
}
export interface UpdateStoryStatus extends Action {
    type: UPDATE_STORY_STATUS,
    payload?: IStory;
}

type Id = number;
export interface DeleteStoryAction extends Action {
    type:DELETE_STORY,
    payload: Id;
}
export interface DeleteStoryStatus extends Action {
    type: DELETE_STORY_STATUS,
    payload?: Id;
}

const fetchStories: ActionCreator<IFetchStoriesAction> = (pageable: IPageConfig = null) => ({
    type: storyConstants.FETCH_STORIES,
    payload: pageable
});

const fetchSuccess: ActionCreator<IFetchStoriesStatus> = (items: IStory[]) => ({
    type: storyConstants.FETCH_STORIES_SUCCESS,
    payload: items
});

const fetchFailure: ActionCreator<IFetchStoriesStatus> = () => ({
    type: storyConstants.FETCH_STORIES_FAILURE
});

const fetchPending: ActionCreator<IFetchStoriesStatus> = () => ({
    type: storyConstants.FETCH_STORIES_PENDING
});

const addStory: ActionCreator<AddStoryAction> = (story: IStory) => ({
    type: storyConstants.ADD_STORY,
    payload: story
});
const addStorySuccess: ActionCreator<AddStoryStatus> = (story: IStory) => ({
    type: storyConstants.ADD_STORY_SUCCESS,
    payload: story
});
const addStoryFailure: ActionCreator<AddStoryStatus> = () => ({type: storyConstants.ADD_STORY_FAILURE});
const addStoryPending: ActionCreator<AddStoryStatus> = () => ({type: storyConstants.ADD_STORY_PENDING});

const updateStory: ActionCreator<UpdateStoryAction> = (story: IStory) => ({
    type: storyConstants.UPDATE_STORY,
    payload: story
});
const updateStorySuccess: ActionCreator<UpdateStoryStatus> = (story: IStory) => ({
    type: storyConstants.UPDATE_STORY_SUCCESS,
    payload: story
});
const updateStoryFailure: ActionCreator<UpdateStoryStatus> = () => ({type: storyConstants.UPDATE_STORY_FAILURE});
const updateStoryPending: ActionCreator<UpdateStoryStatus> = () => ({type: storyConstants.UPDATE_STORY_PENDING});

const deleteStory: ActionCreator<DeleteStoryAction> = (payload: Id) => ({
    type: storyConstants.DELETE_STORY,
    payload
});
const deleteStorySuccess: ActionCreator<DeleteStoryStatus> = (payload: Id) => ({
    type: storyConstants.DELETE_STORY_SUCCESS,
    payload
});
const deleteStoryFailure: ActionCreator<DeleteStoryStatus> = () => ({type: storyConstants.DELETE_STORY_FAILURE});
const deleteStoryPending: ActionCreator<DeleteStoryStatus> = () => ({type: storyConstants.DELETE_STORY_PENDING});

export const storyActions = {
    fetchStories,
    fetchPending,
    fetchSuccess,
    fetchFailure,

    addStory,          //adds story and saves on server
    addStorySuccess,
    addStoryFailure,
    addStoryPending,

    updateStory,
    updateStorySuccess,
    updateStoryFailure,
    updateStoryPending,

    deleteStory,
    deleteStorySuccess,
    deleteStoryFailure,
    deleteStoryPending
};