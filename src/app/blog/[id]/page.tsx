import {CommentTree} from "@/component/comment-tree/comment-tree";
import {Main} from "@/component/container/container";
import {getArticleResolvedById} from "@/content/article";
import {Comment} from "@/content/comment";
import {getUserById, User} from "@/content/user";
import {formatDate} from "@/util/date";
import {tree} from "@/util/tree";
import {UUID} from "crypto";
import {Metadata} from "next";

type Props = {
    params: Promise<{ id: UUID }>
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
    const {id} = await params;
    const {title, content, _users} = await getArticleResolvedById(id);

    return {
        title: title,
        authors: _users.map(user => ({name: user.name})),
        description: `${content.slice(0, 50)}...`,
    };
}

export default async function Page({params}: Readonly<Props>) {
    const {id} = await params;
    const {title, subtitle, create_date, content, _users, _comments} = await getArticleResolvedById(id);

    const comments: (Comment & { _user: User })[] = await Promise.all(_comments.map(async comment => ({
        ...comment,
        _user: await getUserById(comment.user_id),
    })));
    const comment_tree = tree(comments, "comment_id");

    return (
        <Main>
            <div>
                <h1>{title}</h1>
                <h2>{subtitle}</h2>
                <p>
                    <span>am </span>
                    <time dateTime={new Date(create_date).toISOString()}>
                        {formatDate(create_date)}
                    </time>
                    <span>, von {_users.map(user => user.name).join(", ")}</span>
                </p>
            </div>
            {content}
            <hr/>
            <h2>Kommentare</h2>
            <CommentTree tree={comment_tree}/>
        </Main>
    );
}
