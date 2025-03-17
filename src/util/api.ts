'use server';

import {QueryArray} from '@/util/type';

export async function fetchAPI(input: string, init?: RequestInit) {
    return await fetch(`${process.env.API_ENDPOINT}/${input}`, init);
}

export async function fetchResource<T>(type: string, id: string, init?: RequestInit) {
    const response = await fetchAPI(`resource/${type}/${id}`, init);
    return await response.json() as T;
}

export async function queryResource<T>(type: string, offset?: number, count?: number) {
    return await fetchResource<QueryArray<T>>(type, 'query', {
        method: 'POST',
        body: JSON.stringify({
            offset,
            count,
        }),
    });
}
