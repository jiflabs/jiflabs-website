import {Main} from "@/component/container/container";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Login",
    description: "Die Login-Seite",
};

export default async function Page() {
    return (
        <Main>
            <h1>Login</h1>
        </Main>
    );
}
