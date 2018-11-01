import {createBrowserHistory, History } from 'history';
import createMemoryHistory from "history/createMemoryHistory";

let routerHistory: History<any>;

if(typeof(document) !== "undefined") {
    routerHistory = createBrowserHistory({basename: BASE_URL});
} else {
    routerHistory = createMemoryHistory();
}

export { routerHistory };