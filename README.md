# JIFLabs Website

## API Resources: `<backend endpoint>/resource/<resource type>`

e.g. `http://my.super-secure-host.com/resource/blog`

### GET `/<resource id>`

e.g. GET `http://my.super-secure-host.com/resource/blog/83414e6e-b5ba-42d0-a960-877d871fa8b7`

Additional routes:

- GET `/meta` => get additional resource metadata (like file size, creation date, last update time, image width and
  height, etc.)

### POST `/query`

e.g. POST `http://my.super-secure-host.com/resource/blog/query`

```typescript
/**
 * query filter:
 *  - and: AND together N filters
 *  - or: OR together N filters
 *  - match: match a field against a value
 *  - cmp: compare a field against a value with the given operator
 */
type QueryFilter = {
    and?: QueryFilter[],
    or?: QueryFilter[],
    match?: {
        field: string,
        value: null | number | string,
    },
    cmp?: {
        operator: "lt" | "gt" | "lte" | "gte",
        field: string,
        value: null | number | string,
    },
}

/**
 * query sort:
 *  - field: the field to order by
 *  - order: ASCending or DESCending
 */
type QuerySort = {
    field: string,
    order: "asc" | "desc",
}

/**
 * complete query request body:
 *  - query: a query filter
 *  - sort: N sorting rules
 *  - limit: maximum number of results
 *  - offset: offset in result set
 */
type QueryBody = {
    query: QueryFilter,
    sort: QuerySort[],
    limit: number,
    offset: number,
}
```

```typescript
/**
 * successfull query result:
 *  - items: array of queried items
 *  - limit: number of queried items (same as request limit)
 *  - offset: offset of query (same as request offset)
 *  - count: maximum available number of items in resources
 */
type QueryResult<T> = {
    items: T[],
    limit: number,
    offset: number,
    count: number,
}
```

Example Body:

```json
{
  "query": {
    "and": [
      {
        "match": {
          "field": "public",
          "value": true
        }
      },
      {
        "or": [
          {
            "match": {
              "field": "public_date",
              "value": null
            }
          },
          {
            "cmp": {
              "operator": "lte",
              "field": "public_date",
              "value": "some-point-in-time"
            }
          }
        ]
      }
    ]
  },
  "sort": [
    {
      "field": "name",
      "order": "asc"
    },
    {
      "field": "age",
      "order": "desc"
    }
  ],
  "limit": 1000,
  "offset": 0
}
```

Example Result:

```json
{
  "items": [
    {},
    {},
    {}
  ],
  "limit": 3,
  "offset": 12,
  "count": 123
}
```
