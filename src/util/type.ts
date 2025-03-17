export type QueryArray<T> = {
    items: T[],
    total: number,
}

export type Query = {
    offset?: number,
    count?: number,
}

export type BlogItem = {
    id: string,
    title: string,
    author: string,
    date: string,
    category?: string,
    tags?: string[],
    hidden?: boolean,
    content: string,
}
