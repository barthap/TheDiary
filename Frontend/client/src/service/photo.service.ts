import { api } from "../helpers/api";
import {IPhoto} from "../helpers/types";
import {API_URL} from "../consts";
import {createPageQueryString} from "../helpers/ResourceFilters";
import {AxiosPromise} from "axios";
import {IPageConfig} from "../helpers/pagination";

export function fetchPhotos(pageable: IPageConfig): Promise<IPhoto[]> {
    return api.get(API_URL + '/photos' + createPageQueryString(pageable))
        .then(res => res.data)
        .catch(err => { throw err; });
}

export function fetchPhotoDetails(id: number): Promise<IPhoto> {
        return api.get(API_URL + '/photos/' + id + '/details')
            .then(res => res.data);
}

export function uploadPhoto(file: File, title: string): AxiosPromise {
    const data = new FormData();
    data.append('file', file, file.name);
    data.append('title', title);

    return api.post(API_URL + '/photos', data);
}

/*
export const uploadFileRequest = ({ file }) => {
    const dataUrl = new FormData();
    dataUrl.append('file', file, file.name);

    return request.post(`/files`, dataUrl, {
        headers: {
            'Content-Type': `multipart/form-dataUrl; boundary=${dataUrl._boundary}`,
        },
        timeout: 30000,
    });
};*/

/*

export function updatePhoto(id: number, person: IPhoto): Promise<IPhoto> {
    return api.put(API_URL + /photos/ + id, person)
        .then(res => res.dataUrl);
}

export function deletePhoto(id: number): Promise<any> {
    return api.delete(API_URL + '/photos/' + id)
        .then(res => {
            if(res.status === 204) return Promise.resolve();
            else Promise.reject(res);
        });
}*/