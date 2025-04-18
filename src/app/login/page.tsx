import {Main} from "@/component/container/container";
import {Metadata} from "next";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Login",
    };
}

export default async function Page() {
    return (
        <Main>
            <h1>Login</h1>
        </Main>
    );
}
