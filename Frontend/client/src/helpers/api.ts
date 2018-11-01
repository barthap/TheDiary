import axios from "axios";
import {User} from "./user";

export const api = axios.create();

export function setApiAuthToken(token: string) {
    let header = null;

    if (token == null) return;

    header = 'Basic ' + token;
    //api.defaults.headers.common['Authorization'] = header;
    const credentials = atob(token).split(':');
    const username = credentials[0];
    const password = credentials[1];

    api.defaults.auth = { username, password};
}

export function checkForSavedUser(): User {
    if(typeof localStorage === 'undefined' || !localStorage)
        return null;

    const user: User = JSON.parse(localStorage.getItem('user'));
    if(user != null)
        setApiAuthToken(user.token);
    return user;
}