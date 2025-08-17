/*
* title match "Foo" ---> query
* sort by date
* compare publish-date <= now
*
* {
*   filter: { ---> optional
*     and: [ ---> min 1, max N, else error
*       or: [ ---> min 1, max N, else error
*         match: { field: publish_date, value: null },
*         compare: { operation: lte, field: publish_date, value: ... }
*       ],
*       match: { field: category, value: tech }
*     ]
*   },
*   sort: [ ---> optional
*     { by: date, order: desc }
*   ],
*   offset: 123, ---> 0
*   limit: 10,   ---> 100
* }
*/

export type QueryNodeOperation = "lt" | "le" | "gt" | "ge" | "eq" | "ne";
export type QuerySortOrder = "asc" | "desc";

export type QueryNode<T> = {
    and?: QueryNode<T>[],
    or?: QueryNode<T>[],
    match?: {
        field: keyof T,
        value: T[keyof T],
    },
    compare?: {
        operation: QueryNodeOperation,
        field: keyof T,
        value: T[keyof T],
    },
}

export interface Query<T> {
    filter: QueryNode<T> | null,
    sort: object[],
    offset: number,
    limit: number | null,
}

export function unique<T>(items: T[]): T[] {
    return items.filter((item, index, array) => array.indexOf(item) === index);
}

export function apply<T>(filter: QueryNode<T> | null, items: T[]): T[] {
    if (filter === null)
        return items;

    const {and, or, match, compare} = filter;

    if (and) {
        for (const filter of and) {
            items = apply(filter, items);
        }
        return items;
    }

    if (or) {
        const filtered: T[][] = [];
        for (const filter of or) {
            filtered.push(apply(filter, items));
        }
        return unique(filtered.flat());
    }

    if (match) {
        return items.filter(item => item[match.field] === match.value);
    }

    if (compare) {
        return items.filter(item => {
            switch (compare.operation) {
                case "lt":
                    return item[compare.field] < compare.value;
                case "le":
                    return item[compare.field] <= compare.value;
                case "gt":
                    return item[compare.field] > compare.value;
                case "ge":
                    return item[compare.field] >= compare.value;
                case "eq":
                    return item[compare.field] === compare.value;
                case "ne":
                    return item[compare.field] !== compare.value;
                default:
                    return false;
            }
        });
    }

    return items;
}

export class QueryBuilder<T> {

    private _filter: QueryNodeBuilder<T> | null;
    private _sort: QuerySort<T, keyof T>[];
    private _offset: number;
    private _limit: number | null;

    constructor() {
        this._filter = null;
        this._sort = [];
        this._offset = 0;
        this._limit = null;
    }

    filter(node: QueryNodeBuilder<T>) {
        this._filter = node;
        return this;
    }

    match<K extends keyof T>(field: K, value: T[K]) {
        this._filter = new QueryNodeMatchBuilder(field, value);
        return this;
    }

    compare<K extends keyof T>(operation: QueryNodeOperation, field: K, value: T[K]) {
        this._filter = new QueryNodeCompareBuilder(operation, field, value);
        return this;
    }

    sort<K extends keyof T>(field: K, order: QuerySortOrder) {
        this._sort.push(new QuerySort(field, order));
        return this;
    }

    offset(value: number) {
        this._offset = value;
        return this;
    }

    limit(value: number | null) {
        this._limit = value;
        return this;
    }

    build(): Query<T> {
        return {
            filter: this._filter?.build() ?? null,
            sort: this._sort.map(sort => sort.build()),
            offset: this._offset,
            limit: this._limit,
        };
    }
}

export class QueryNodeBuilder<T> {

    constructor() {
    }

    build(): QueryNode<T> | null {
        return null;
    }
}

export class QueryNodeMultiBuilder<T> extends QueryNodeBuilder<T> {

    private readonly _keyword: "and" | "or";
    private readonly _nodes: QueryNodeBuilder<T>[];

    constructor(keyword: "and" | "or", nodes: QueryNodeBuilder<T>[]) {
        super();
        this._keyword = keyword;
        this._nodes = nodes;
    }

    filter(node: QueryNodeBuilder<T>) {
        this._nodes.push(node);
        return this;
    }

    match<K extends keyof T>(field: K, value: T[K]) {
        this._nodes.push(new QueryNodeMatchBuilder(field, value));
        return this;
    }

    compare<K extends keyof T>(operation: QueryNodeOperation, field: K, value: T[K]) {
        this._nodes.push(new QueryNodeCompareBuilder(operation, field, value));
        return this;
    }

    build(): QueryNode<T> {
        return {
            [this._keyword]: this._nodes.map(node => node.build()),
        } as unknown as QueryNode<T>;
    }
}

export class QueryNodeAndBuilder<T> extends QueryNodeMultiBuilder<T> {

    constructor(nodes: QueryNodeBuilder<T>[]) {
        super("and", nodes);
    }
}

export class QueryNodeOrBuilder<T> extends QueryNodeMultiBuilder<T> {

    constructor(nodes: QueryNodeBuilder<T>[]) {
        super("or", nodes);
    }
}

export class QueryNodeMatchBuilder<T, K extends keyof T> extends QueryNodeBuilder<T> {

    private readonly _field: K;
    private readonly _value: T[K];

    constructor(field: K, value: T[K]) {
        super();
        this._field = field;
        this._value = value;
    }

    build(): QueryNode<T> {
        return {
            match: {
                field: this._field,
                value: this._value,
            },
        };
    }
}

export class QueryNodeCompareBuilder<T, K extends keyof T> extends QueryNodeBuilder<T> {

    private readonly _operation: QueryNodeOperation;
    private readonly _field: K;
    private readonly _value: T[K];

    constructor(operation: QueryNodeOperation, field: K, value: T[K]) {
        super();
        this._operation = operation;
        this._field = field;
        this._value = value;
    }

    build(): QueryNode<T> {
        return {
            compare: {
                operation: this._operation,
                field: this._field,
                value: this._value,
            },
        };
    }
}

export class QuerySort<T, K extends keyof T> {

    private readonly _field: K;
    private readonly _order: QuerySortOrder;

    constructor(field: K, order: QuerySortOrder) {
        this._field = field;
        this._order = order;
    }

    build() {
        return {
            field: this._field,
            order: this._order,
        };
    }
}

export function and<T>() {
    return new QueryNodeAndBuilder<T>([]);
}

export function or<T>() {
    return new QueryNodeOrBuilder<T>([]);
}
