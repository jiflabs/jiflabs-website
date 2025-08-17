export async function POST(request: Request) {
    return new Response(JSON.stringify({
        items: [],
        total: 0,
    }));
}
