import {Main} from "@/component/container/container";
import Test from "@/component/test/test";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Über JIF",
    description: "Über uns",
};

export default async function Page() {
    return (
        <Main>
            <h1>Über JIF</h1>
            <Test/>
        </Main>
    );
}
