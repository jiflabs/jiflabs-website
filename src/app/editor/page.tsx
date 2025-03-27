import {Main} from "@/component/container/container";
import MDEditor, {Data} from "@/component/md-editor/md-editor";
import {DefaultStrings} from "@/lang/lang";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: DefaultStrings.page.editor.title,
    description: DefaultStrings.page.editor.description,
};

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
            <h1>{DefaultStrings.page.editor.title}</h1>
            <MDEditor onSubmit={submit}/>
        </Main>
    );
}
