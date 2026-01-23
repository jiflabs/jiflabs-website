import dummy from "../dummy";

export async function GET(request: Request, context: RouteContext<"/api/resource/content/article/[id]">) {
    const {id} = await context.params;

    return new Response(JSON.stringify(dummy.find(article => article.id === id) ?? null));
}
