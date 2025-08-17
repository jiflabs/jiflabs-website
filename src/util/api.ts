import "server-only";

import {Query} from "@/util/query";
import {Table} from "@/util/type";
import {UUID} from "crypto";

export async function fetchAPI(path: string, init?: RequestInit) {
    let response;
    try {
        response = await fetch(`${process.env.API_ENDPOINT}/${path}`, init);
    } catch (error) {
        throw new Error(`failed to fetch api '${path}': ${error}`, {cause: error});
    }
    if (!response.ok) {
        throw new Error(`failed to fetch api '${path}': ${response.status} - ${response.statusText}`);
    }
    return response;
}

export async function getEntityById<T>(schema: string, table: string, id: UUID, init?: RequestInit): Promise<T> {
    const response = await fetchAPI(`resource/${schema}/${table}/${id}`, init);
    const entity = await response.json() as (T | null);
    if (entity === null)
        throw new Error(`${schema}/${table}/${id} is null`);
    return entity;
}

export async function queryTable<T>(schema: string, table: string, query: Query<T>) {
    const response = await fetchAPI(`resource/${schema}/${table}/query`, {
        method: "POST",
        body: JSON.stringify(query),
    });
    return await response.json() as Table<T>;
}
