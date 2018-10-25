import { combineReducers } from 'redux';
import alert, {IAlertState} from './alert.reducer';
import auth, {IAuthState} from './auth.reducer';
import story, {IStoryState} from "./story.reducer";
import people, {IPeopleState} from "./people.reducer";

export interface IAppState {
    auth: IAuthState;
    alert: IAlertState;
    story: IStoryState;
    people: IPeopleState;
}

const rootReducer = combineReducers<IAppState>({
    story,
    alert,
    auth,
    people
});


export default rootReducer;
