import {Article, getArticleById} from "@/content/article";
import {Base} from "@/content/base";
import {getUserById, User} from "@/content/user";
import {getEntityById, queryTable} from "@/util/api";
import {QueryBuilder} from "@/util/query";
import {UUID} from "crypto";
import {unstable_cache} from "next/cache";

export interface Comment extends Base {
    article_id: UUID,
    user_id: UUID,
    comment_id: UUID | null,
    create_date: number,
    content: string,
    likes: number,
}

export interface CommentResolved extends Comment {
    _article: Article,
    _user: User,
    _comment: Comment | null,
}

export const getCommentById = async (id: UUID) => unstable_cache(async () => {
    return getEntityById<Comment>("content", "comment", id);
}, [id], {
    tags: ["comment"],
    revalidate: 5 * 60,
})();

export const getCommentsByArticleId = async (article_id: UUID) => unstable_cache(async () => {
    return queryTable<Comment>("content", "comment", new QueryBuilder<Comment>().match("article_id", article_id).build());
}, [article_id], {
    tags: ["comment"],
    revalidate: 5 * 60,
})();

export const getCommentsByUserId = async (user_id: UUID) => unstable_cache(async () => {
    return queryTable<Comment>("content", "comment", new QueryBuilder<Comment>().match("user_id", user_id).build());
}, [user_id], {
    tags: ["comment"],
    revalidate: 5 * 60,
})();

export const getCommentsByCommentId = async (comment_id: UUID) => unstable_cache(async () => {
    return queryTable<Comment>("content", "comment", new QueryBuilder<Comment>().match("comment_id", comment_id).build());
}, [comment_id], {
    tags: ["comment"],
    revalidate: 5 * 60,
})();

export const getCommentResolvedById = async (id: UUID) => {
    const comment = await getCommentById(id);

    const article = await getArticleById(comment.article_id);
    const user = await getUserById(comment.user_id);
    const parent = comment.comment_id && await getCommentById(comment.comment_id);

    return {
        ...comment,
        _article: article,
        _user: user,
        _comment: parent,
    } as CommentResolved;
};

export const getAllComments = async (offset?: number, limit?: number) => {
    return queryTable<Comment>("content", "comment", new QueryBuilder<Comment>().offset(offset ?? 0).limit(limit ?? null).build());
};
