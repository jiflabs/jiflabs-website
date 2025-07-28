import {Main} from "@/component/container/container";
import {fetchResource} from "@/util/api";
import {formatDate} from "@/util/date";
import {BlogItem} from "@/util/type";
import {Metadata} from "next";

type Props = {
    params: Promise<{ id: string }>
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
    const {id} = await params;
    const blog = await fetchResource<BlogItem>("blog", id);

    return {
        title: blog.title,
        authors: [{name: blog.author}],
        description: blog.content.slice(0, 50) + "...",
    };
}

export default async function Page({params}: Props) {
    const {id} = await params;

    const blog = await fetchResource<BlogItem>("blog", id);

    return (
        <Main>
            <div>
                <h1>{blog.title}</h1>
                <h2>von {blog.author}</h2>
                <h3>in {blog.category}</h3>
                <time dateTime={blog.date}><h4>{formatDate(blog.date)}</h4></time>
            </div>
            {blog.content}
        </Main>
    );
}
