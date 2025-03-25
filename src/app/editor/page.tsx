import {Main} from "@/component/container/container";
import MDEditor, {Data} from "@/component/md-editor/md-editor";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Markdown Editor",
    description: "Die Markdown-Editor-Seite",
};

async function submit(data: Data): Promise<{ success: boolean, message?: string }> {
    "use server";

    console.log(data);

    const response = await fetch(`${process.env.API_ENDPOINT}/resources/blog/create`, {
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
            <MDEditor onSubmit={submit}/>
        </Main>
    );
}
