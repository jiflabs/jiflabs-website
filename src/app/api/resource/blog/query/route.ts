import {BlogItem, Query, QueryArray} from "@/util/type";

export async function POST(request: Request): Promise<Response> {
    const response = await fetch("https://api.vercel.app/blog");
    const blogs = await response.json() as BlogItem[];
    const {offset, count}: Query = await request.json();
    const data: QueryArray<BlogItem> = {
        items: blogs.slice(offset, (offset ?? 0) + (count ?? blogs.length)),
        total: blogs.length,
    };
    return Response.json(data);
}
