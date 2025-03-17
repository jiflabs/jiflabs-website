import {BlogItem} from "@/util/type";

export async function GET(request: Request, {params}: { params: Promise<{ id: string }> }): Promise<Response> {
    const {id} = await params;
    const response = await fetch(`https://api.vercel.app/blog/${id}`);
    const blog = await response.json() as BlogItem;
    return Response.json(blog);
}
