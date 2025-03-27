import {Main} from "@/component/container/container";
import {DefaultStrings} from "@/lang/lang";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: DefaultStrings.page.about.title,
    description: DefaultStrings.page.about.description,
};

export default async function Page() {
    return (
        <Main>
            <h1>{DefaultStrings.page.about.title}</h1>
        </Main>
    );
}
