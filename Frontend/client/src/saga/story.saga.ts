import {all, put, takeEvery} from "redux-saga/effects";
import {storyConstants} from "../consts/story.constants";
import {
    AddStoryAction,
    DeleteStoryAction,
    IFetchStoriesAction,
    storyActions,
    UpdateStoryAction
} from "../actions/story.actions";
import { IStory} from "../helpers/types";
import * as storyService from '../service/story.service';
import {alertActions} from "../actions/alert.actions";


const watchStoryFetch = function* () {
    yield takeEvery(storyConstants.FETCH_STORIES, function* (action: IFetchStoriesAction) {
        yield put(storyActions.fetchPending());
        try {
            const pageable = action.payload;
            const stories: IStory[] = yield storyService.fetchStories(pageable);

            yield put(storyActions.fetchSuccess(stories));
        } catch (e) {
            console.warn("Fetch stories error", e);

            yield put(storyActions.fetchFailure());
        }

    });
};

const watchAddStory = function* () {
    yield takeEvery(storyConstants.ADD_STORY, function* (action: AddStoryAction) {
        yield put(storyActions.addStoryPending());
        try {
            const result: IStory = yield storyService.addStory(action.payload)
                .catch(e => {
                    throw e;
                });

            yield put(storyActions.addStorySuccess(result));
            yield put(alertActions.success("Added story"));
        } catch (e) {
            console.warn("Add story error", e);
            yield put(storyActions.addStoryFailure());
            yield put(alertActions.error("Adding story failed"));
        }

    });
};

const watchUpdateStory = function* () {
    yield takeEvery(storyConstants.UPDATE_STORY, function* (action: UpdateStoryAction) {
        yield put(storyActions.updateStoryPending());
        try {
            const { payload } = action;
            if(!payload || !payload.id || payload.id < 1)
                throw "Invalid ID";
            const result: IStory = yield storyService.updateStory(payload.id, payload)
                .catch(e => {
                    throw e;
                });

            yield put(storyActions.updateStorySuccess(result));
            yield put(alertActions.success("Story updated successfully"));
        } catch (e) {
            console.warn("Update story error", e);
            yield put(storyActions.updateStoryFailure());
            yield put(alertActions.error("Updating story failed"));
        }

    });
};

const watchDeleteStory = function* () {
    yield takeEvery(storyConstants.DELETE_STORY, function* (action: DeleteStoryAction) {
        yield put(storyActions.deleteStoryPending());
        try {
            yield storyService.deleteStory(action.payload)
                .catch(e=> {throw e;});

            yield put(storyActions.deleteStorySuccess(action.payload));
            yield put(alertActions.info("Story deleted"));
        } catch (e) {
            console.warn("Delete story error", e);
            yield put(storyActions.deleteStoryFailure());
            yield put(alertActions.error("Could not delete story!"));
        }
    });
};


export const storySaga = function* () {
    yield all([
        watchStoryFetch(),
        watchAddStory(),
        watchUpdateStory(),
        watchDeleteStory()
    ]);
};