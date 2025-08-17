import {UUID} from "crypto";
import dummy from "../dummy";

export async function GET(request: Request, context: { params: Promise<{ id: UUID }> }) {
    const {id} = await context.params;

    return new Response(JSON.stringify(dummy.find(user => user.id === id) ?? null));
}
