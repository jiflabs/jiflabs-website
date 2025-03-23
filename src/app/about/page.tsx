import {Main} from "@/component/container/container";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Über JIF",
    description: "Über uns",
};

export default async function Page() {
    return (
        <Main>
            <h1>Über JIF</h1>
        </Main>
    );
}
