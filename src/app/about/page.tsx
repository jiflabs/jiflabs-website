import {Main} from "@/component/container/container";
import {Metadata} from "next";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Über Uns",
    };
}

export default async function Page() {
    return (
        <Main>
            <h1>Über Uns</h1>
        </Main>
    );
}
