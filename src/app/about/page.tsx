import Container from "@/component/container/container";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Über JIF",
    description: "Über uns",
};

export default async function Page() {
    return (
        <Container as="main">
            <h1>Über JIF</h1>
        </Container>
    );
}
