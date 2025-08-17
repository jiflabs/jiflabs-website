import {ArticleUser} from "@/content/article-user";
import {apply, Query} from "@/util/query";
import dummy from "../dummy";

export async function POST(request: Request) {
    const query: Query<ArticleUser> = await request.json();

    const items = apply(query.filter, dummy);

    return new Response(JSON.stringify({
        items: items.slice(query.offset, query.limit !== null ? (query.offset + query.limit) : undefined),
        total: items.length,
    }));
}
