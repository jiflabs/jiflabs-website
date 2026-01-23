import dummy from "../dummy";

export async function GET(request: Request, context: RouteContext<"/api/resource/content/user/[id]">) {
    const {id} = await context.params;

    return new Response(JSON.stringify(dummy.find(user => user.id === id) ?? null));
}
