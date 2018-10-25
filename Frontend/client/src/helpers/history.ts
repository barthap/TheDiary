import {createBrowserHistory, History, MemoryHistory} from 'history';
import createMemoryHistory from "history/createMemoryHistory";

let routerHistory: History<any>;

if(typeof(document) !== "undefined") {
    routerHistory = createBrowserHistory();
} else {
    routerHistory = createMemoryHistory();
}

export { routerHistory };