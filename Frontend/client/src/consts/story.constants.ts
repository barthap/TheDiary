
export const storyConstants = {
    FETCH_STORIES: 'FETCH_STORIES',
    FETCH_STORIES_PENDING: 'FETCH_STORIES_PENDING',
    FETCH_STORIES_SUCCESS: 'FETCH_STORIES_SUCCESS',
    FETCH_STORIES_FAILURE: 'FETCH_STORIES_FAILURE',

    ADD_STORY: 'ADD_STORY',
    ADD_STORY_PENDING: 'ADD_STORY_PENDING',
    ADD_STORY_SUCCESS: 'ADD_STORY_SUCCESS',
    ADD_STORY_FAILURE: 'ADD_STORY_FAILURE',

    UPDATE_STORY: 'UPDATE_STORY',
    UPDATE_STORY_SUCCESS: 'UPDATE_STORY_SUCCESS',
    UPDATE_STORY_PENDING: 'UPDATE_STORY_PENDING',
    UPDATE_STORY_FAILURE: 'UPDATE_STORY_FAILURE',

    DELETE_STORY: 'DELETE_STORY',
    DELETE_STORY_SUCCESS: 'DELETE_STORY_SUCCESS',
    DELETE_STORY_PENDING: 'DELETE_STORY_PENDING',
    DELETE_STORY_FAILURE: 'DELETE_STORY_FAILURE'
};

export type FETCH_STORIES = typeof storyConstants.FETCH_STORIES;
export type FETCH_STORIES_SUCCESS = typeof storyConstants.FETCH_STORIES_SUCCESS;
export type FETCH_STORIES_FAILURE = typeof storyConstants.FETCH_STORIES_FAILURE;
export type FETCH_STORIES_PENDING = typeof storyConstants.FETCH_STORIES_PENDING;
export type FETCH_STORIES_STATUS = FETCH_STORIES_PENDING | FETCH_STORIES_SUCCESS | FETCH_STORIES_FAILURE;

export type ADD_STORY = typeof storyConstants.ADD_STORY;
export type ADD_STORY_PENDING = typeof storyConstants.ADD_STORY_PENDING;
export type ADD_STORY_SUCCESS = typeof storyConstants.ADD_STORY_SUCCESS;
export type ADD_STORY_FAILURE = typeof storyConstants.ADD_STORY_FAILURE;
export type ADD_STORY_STATUS = ADD_STORY_PENDING | ADD_STORY_SUCCESS | ADD_STORY_FAILURE;

export type UPDATE_STORY = typeof storyConstants.UPDATE_STORY;
export type UPDATE_STORY_PENDING = typeof storyConstants.UPDATE_STORY_PENDING;
export type UPDATE_STORY_SUCCESS = typeof storyConstants.UPDATE_STORY_SUCCESS;
export type UPDATE_STORY_FAILURE = typeof storyConstants.UPDATE_STORY_FAILURE;
export type UPDATE_STORY_STATUS = UPDATE_STORY_PENDING | UPDATE_STORY_SUCCESS | UPDATE_STORY_FAILURE;

export type DELETE_STORY = typeof storyConstants.DELETE_STORY;
export type DELETE_STORY_PENDING = typeof storyConstants.DELETE_STORY_PENDING;
export type DELETE_STORY_SUCCESS = typeof storyConstants.DELETE_STORY_SUCCESS;
export type DELETE_STORY_FAILURE = typeof storyConstants.DELETE_STORY_FAILURE;
export type DELETE_STORY_STATUS = DELETE_STORY_PENDING | DELETE_STORY_SUCCESS | DELETE_STORY_FAILURE;