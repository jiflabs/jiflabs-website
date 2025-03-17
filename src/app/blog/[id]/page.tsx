import Container from "@/component/container/container";
import {fetchResource} from "@/util/api";
import {BlogItem} from "@/util/type";

export default async function Page({params}: { params: Promise<{ id: string }> }) {

    const {id} = await params;
    const blog = await fetchResource<BlogItem>("blog", id);

    return (
        <Container as="main">
            <h1>{blog.title}</h1>
            <h2>by {blog.author}</h2>
            <h3>in {blog.category}</h3>
            <time dateTime={blog.date}><h4>{new Date(blog.date).toLocaleDateString()}</h4></time>
            {blog.content}
        </Container>
    );
}

export const dynamic = "force-dynamic";
