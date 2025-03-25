import {Main} from "@/component/container/container";
import MDEditor from "@/component/md-editor/md-editor";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Markdown Editor",
    description: "Die Markdown-Editor-Seite",
};

export default async function Page() {
    return (
        <Main>
            <h1>Markdown Editor</h1>
            <MDEditor/>
        </Main>
    );
}
