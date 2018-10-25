import { api } from "../helpers/api";
import {PageConfig, Person} from "../types";
import {API_URL} from "../consts";
import {createPageQueryString} from "../helpers/ResourceFilters";

export function fetchPeople(pageable: PageConfig): Promise<Person[]> {
    return api.get(API_URL + '/people' + createPageQueryString(pageable))
        .then(res => res.data)
        .catch(err => { throw err; });
}

export function fetchSinglePerson(id: number): Promise<Person> {
        return api.get(API_URL + '/people/' + id)
            .then(res => res.data);
}

export function addPerson(person: Person): Promise<Person> {
    /*const dto = {
        fullName: person.fullName,
        birthDate: person.birthDate,
        description: person.description
    };*/

    return api.post(API_URL + '/people', person)
        .then(res => res.data);
}

export function updatePerson(id: number, person: Person): Promise<Person> {
    return api.put(API_URL + /people/ + id, person)
        .then(res => res.data);
}

export function deletePerson(id: number): Promise<any> {
    return api.delete(API_URL + '/people' + id)
        .then(res => {
            if(res.status === 204) return Promise.resolve();
            else Promise.reject();
        });
}