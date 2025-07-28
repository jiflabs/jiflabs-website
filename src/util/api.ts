import "server-only";

import {QueryArray} from "@/util/type";

export async function fetchAPI(path: string, init?: RequestInit) {
    const response = await fetch(`${process.env.API_ENDPOINT}/${path}`, init);
    if (!response.ok)
        throw new Error(`${response.status} - ${response.statusText}`);
    return response;
}

export async function fetchResource<T>(type: string, id: string, init?: RequestInit) {
    const response = await fetchAPI(`resource/${type}/${id}`, init);
    const resource = await response.json() as (T | null);
    if (!resource)
        throw new Error(`${type} '${id}' is null`);
    return resource;
}

export async function queryResource<T>(type: string, offset?: number, size?: number) {
    return await fetchResource<QueryArray<T>>(type, "query", {
        method: "POST",
        body: JSON.stringify({
            offset,
            size,
        }),
    });
}
