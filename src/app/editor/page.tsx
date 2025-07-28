import {Main} from "@/component/container/container";
import MDEditor, {Data} from "@/component/md-editor/md-editor";

import {Metadata} from "next";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Markdown Editor",
    };
}

async function submit(data: Data): Promise<{ success: boolean, message?: string }> {
    "use server";

    const response = await fetch(`${process.env.API_ENDPOINT}/resource/blog/create`, {
        method: "POST",
        body: JSON.stringify(data),
    });

    if (response.ok)
        return {success: true};

    return {success: false, message: response.statusText};
}

export default async function Page() {
    return (
        <Main>
            <h1>Markdown Editor</h1>
            <MDEditor onSubmitAction={submit}/>
        </Main>
    );
}
