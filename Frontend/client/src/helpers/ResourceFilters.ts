import {IPageConfig} from "./pagination";
import {SortOrder} from "./pagination";


export function createPageQueryString (pageable: IPageConfig): string {

    if(pageable == null) return '';
    const { page, size, sort } = pageable;

    let params = [];
    if(page != null) params.push(`page=${page}`);
    if(size != null) params.push(`size=${size}`);
    if (sort != null) {
        const order = sort.order == SortOrder.ASC ? 'asc' : 'desc';
        params.push(`&sort=${sort.property},${order}`);
    }

    return (params.length > 0 ? `?` : '')
        + params.join('&');
}