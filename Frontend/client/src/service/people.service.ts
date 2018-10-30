import { api } from "../helpers/api";
import {IPerson} from "../helpers/types";
import {API_URL} from "../consts";
import {createPageQueryString} from "../helpers/ResourceFilters";
import {IPageConfig} from "../helpers/pagination";

export function fetchPeople(pageable: IPageConfig): Promise<IPerson[]> {
    return api.get(API_URL + '/people' + createPageQueryString(pageable))
        .then(res => res.data)
        .catch(err => { throw err; });
}

export function fetchSinglePerson(id: number): Promise<IPerson> {
        return api.get(API_URL + '/people/' + id)
            .then(res => res.data);
}

export function addPerson(person: IPerson): Promise<IPerson> {
    /*const dto = {
        fullName: person.fullName,
        birthDate: person.birthDate,
        description: person.description
    };*/

    return api.post(API_URL + '/people', person)
        .then(res => res.data);
}

export function updatePerson(id: number, person: IPerson): Promise<IPerson> {
    return api.put(API_URL + /people/ + id, person)
        .then(res => res.data);
}

export function deletePerson(id: number): Promise<any> {
    return api.delete(API_URL + '/people/' + id)
        .then(res => {
            if(res.status === 204) return Promise.resolve();
            else Promise.reject(res);
        });
}