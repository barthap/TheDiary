
export function appendAndCopy<T>(array: T[], item: T): T[] {
    const temp = {...array};
    temp.push(item);
    return temp;
}

export function deleteFromArrayById<T>(array: T[], id: number): T[] {
    const temp = {...array};
    temp.splice(temp.findIndex((t: any) => t.id === id), 1);
    return temp;
}

export function normalizeArray<T>(array: Array<T>, indexKey: keyof T) {
    const normalizedObject: any = {};
    for (let i = 0; i < array.length; i++) {
        const key = array[i][indexKey];
        normalizedObject[key] = array[i];
    }
    return normalizedObject as { [key: number]: T }
}

export function dictionaryValues(data: any) {
    return Object.keys(data).map(k=> data[k]);
}

export function displayDate(timestamp: number): string {
    return new Date(timestamp).toLocaleDateString();
}
export function displayDateTime(timestamp: number): string {
    return new Date(timestamp).toLocaleString();
}

export function isUserLoggedIn(): boolean {
    if(typeof localStorage === 'undefined' || !localStorage)
        return false;
    return JSON.parse(localStorage.getItem('user')) != null;
}

/**
 * Fake Delay
 * @param ms time to sleep in ms
 */
export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));