import { api } from "../helpers/api";
import {PageConfig, Story} from "../types";
import {API_URL} from "../consts";

export function fetchStories(pageable: PageConfig): Promise<Story[]> {
    return api.get(API_URL + '/story')
        .then(res => res.data)
        .catch(err => { throw err; });
}