export class QueryBuilder {

}

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
*   count: 10,   ---> 100
* }
*/
