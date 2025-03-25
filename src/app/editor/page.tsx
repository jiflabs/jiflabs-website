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

    return {success: true};
}

export default async function Page() {
    return (
        <Main>
            <h1>Markdown Editor</h1>
            <MDEditor onSubmit={submit}/>
        </Main>
    );
}
