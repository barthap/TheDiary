import { combineReducers } from 'redux';
import list from '../boilerplate/reducers/list';
import alert from '../reducers/alert.reducer';

const rootReducer = combineReducers({
  list, // shorthand for lists: lists
    alert
});

export default rootReducer;
