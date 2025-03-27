import {Main} from "@/component/container/container";
import {DefaultStrings} from "@/lang/lang";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: DefaultStrings.page.login.title,
    description: DefaultStrings.page.login.description,
};

export default async function Page() {
    return (
        <Main>
            <h1>{DefaultStrings.page.login.title}</h1>
        </Main>
    );
}
