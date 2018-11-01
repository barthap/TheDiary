import { api } from "../helpers/api";
import {IStory} from "../helpers/types";
import {IPageConfig} from "../helpers/pagination";
import {createPageQueryString} from "../helpers/ResourceFilters";

export function fetchStories(pageable: IPageConfig): Promise<IStory[]> {
    return api.get(API_URL + '/story' + createPageQueryString(pageable))
        .then(res => res.data)
        .catch(err => { throw err; });
}

export function fetchSingleStory(id: number): Promise<IStory> {
    return api.get(API_URL + '/story/' + id)
        .then(res => res.data);
}

export function addStory(story: IStory): Promise<IStory> {
    return api.post(API_URL + '/story', story)
        .then(res => res.data);
}

export function updateStory(id: number, story: IStory): Promise<IStory> {
    return api.put(API_URL + /story/ + id, story)
        .then(res => res.data);
}

export function deleteStory(id: number): Promise<any> {
    return api.delete(API_URL + '/story/' + id)
        .then(res => {
            if(res.status === 204) return Promise.resolve();
            else Promise.reject(res);
        });
}