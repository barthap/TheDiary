import { createBrowserHistory } from 'history';
import createMemoryHistory from "history/createMemoryHistory";

let routerHistory: any;

if(typeof(document) !== "undefined") {
    routerHistory = createBrowserHistory();
} else {
    routerHistory = createMemoryHistory();
}

export { routerHistory };