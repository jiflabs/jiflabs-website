import Container from "@/component/container/container";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Login",
    description: "Die Login-Seite",
};

export default async function Page() {
    return (
        <Container as="main">
            <h1>Login</h1>
        </Container>
    );
}
