import axios from "axios";
import {User} from "./user";

export const api = axios.create();

export function setApiAuthToken(token: string) {
    let header = null;

    if (token !== null)
        header = 'Basic ' + token;

    api.defaults.headers.common['Authorization'] = header;
}

export function checkForSavedUser(): User {
    const user: User = JSON.parse(localStorage.getItem('user'));
    if(user != null)
        setApiAuthToken(user.token);
    return user;
}