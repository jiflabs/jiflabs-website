import dummy from "../dummy";

export async function GET(request: Request, context: RouteContext<"/api/resource/content/comment/[id]">) {
    const {id} = await context.params;

    return new Response(JSON.stringify(dummy.find(comment => comment.id === id) ?? null));
}
