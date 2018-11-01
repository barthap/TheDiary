import axios from 'axios';
import {User} from "../helpers/user";
import {setApiAuthToken} from "../helpers/api";

export function login(username: string, password: string): Promise<User> {

    const token = btoa(username + ':' + password);

    console.log("into login", username, password);

    return axios.get(API_URL + '/me', {auth: {username, password}})
        .then(res => {
            if(res.status === 200)
                return Promise.resolve(res.data);
            else if(res.status === 401)
                return Promise.reject("Invalid credentials");
            else
                return Promise.reject(res.status + res.statusText);
        })
        .then(data => {
            if(data.username != null) {
                setApiAuthToken(token);
                const user: User = { username: data.username, token: token};
                localStorage.setItem('user', JSON.stringify(user));
                console.log("Retrieved user", user);
                return user;
            } else Promise.reject("Invalid credentials!");
    }).catch(e => { console.log("Axios catch err", e); throw e });

}

export function logout() {
    console.log("Logging out...");
    localStorage.removeItem('user');
    setApiAuthToken(null);
}
