import {Main} from "@/component/container/container";
import {getArticleResolvedById} from "@/content/article";
import {Comment} from "@/content/comment";
import {getUserById} from "@/content/user";
import {formatDate} from "@/util/date";
import {tree, TreeNode} from "@/util/tree";
import {faThumbsUp} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {UUID} from "crypto";
import {Metadata} from "next";
import styles from "./page.module.scss";

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

type CommentTreeLevelProps = {
    tree: TreeNode<Comment>[],
};

function CommentTreeLevel({tree}: Readonly<CommentTreeLevelProps>) {
    if (!tree.length)
        return;

    return (
        <ul className={styles.comment_tree}>
            {tree.map(async ({value, children}) => {
                const user = await getUserById(value.user_id);

                return (
                    <li key={value.id}>
                        <div className={styles.comment_item}>
                            <span className={styles.user_name}>{user.name}</span>
                            <time dateTime={new Date(value.create_date).toISOString()}>
                                {formatDate(value.create_date)}
                            </time>
                            <span>{value.content}</span>
                            <span><FontAwesomeIcon icon={faThumbsUp}/> {value.likes}</span>
                        </div>
                        <CommentTreeLevel tree={children}/>
                    </li>
                );
            })}
        </ul>
    );
}

export default async function Page({params}: Readonly<Props>) {
    const {id} = await params;
    const {title, subtitle, create_date, content, _users, _comments} = await getArticleResolvedById(id);

    const comment_tree = tree(_comments, "comment_id");

    return (
        <Main>
            <div>
                <h1>{title}</h1>
                <h2>{subtitle}</h2>
                <p>
                    am&nbsp;
                    <time dateTime={new Date(create_date).toISOString()}>
                        {formatDate(create_date)}
                    </time>
                    , von {_users.map(user => user.name).join(", ")}
                </p>
            </div>
            {content}
            <hr/>
            <h2>Kommentare</h2>
            <CommentTreeLevel tree={comment_tree}/>
        </Main>
    );
}
