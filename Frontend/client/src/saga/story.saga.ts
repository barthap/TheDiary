import {all, put, takeEvery} from "redux-saga/effects";
import {storyConstants} from "../consts/story.constants";
import {IFetchStoriesAction, storyActions} from "../actions/story.actions";
import {Story} from "../types";
import * as storyService from '../service/story.service';


const watchStoryFetch = function* () {
    yield takeEvery(storyConstants.FETCH_STORIES, function* (action: IFetchStoriesAction) {
        yield put(storyActions.fetchPending());
        try {
            const pageable = action.payload;
            const stories: Story[] = yield storyService.fetchStories(pageable);

            yield put(storyActions.fetchSuccess(stories));
        } catch (e) {
            console.warn("Fetch stories error", e);

            yield put(storyActions.fetchFailure());
        }

    });
};


export const storySaga = function* () {
    yield all([
        watchStoryFetch()
    ]);
};