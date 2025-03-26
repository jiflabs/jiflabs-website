export async function POST(request: Request): Promise<Response> {
    const data = await request.json();

    console.log(data);

    return new Response();
}
