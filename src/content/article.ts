import {getArticleTagsByTagId} from "@/content/article-tag";
import {getArticleUsersByUserId} from "@/content/article-user";
import {Base} from "@/content/base";
import {Comment, getCommentsByArticleId} from "@/content/comment";
import {getTagsByArticleId, Tag} from "@/content/tag";
import {getUsersByArticleId, User} from "@/content/user";
import {getEntityById, queryTable} from "@/util/api";
import {QueryBuilder} from "@/util/query";
import {Table} from "@/util/type";
import {UUID} from "crypto";
import {unstable_cache} from "next/cache";

export interface Article extends Base {
    title: string,
    subtitle: string | null,
    create_date: number,
    publish_date: number | null,
    visible: boolean,
    thumbnail: string | null,
    content: string,
    likes: number,
}

export interface ArticleResolved extends Article {
    _tags: Tag[],
    _users: User[],
    _comments: Comment[],
}

export const getArticleById = async (id: UUID) => unstable_cache(async () => {
    return getEntityById<Article>("content", "article", id);
}, [id], {
    tags: ["article"],
    revalidate: 5 * 60,
})();

export const getArticlesByUserId = async (user_id: UUID) => unstable_cache(async () => {
    const {items, total} = await getArticleUsersByUserId(user_id);

    return {
        items: await Promise.all(items.map(async item => await getArticleById(item.article_id))),
        total,
    } as Table<Article>;
}, [user_id], {
    tags: ["article"],
    revalidate: 5 * 60,
})();

export const getArticlesByTagId = async (tag_id: UUID) => unstable_cache(async () => {
    const {items, total} = await getArticleTagsByTagId(tag_id);

    return {
        items: await Promise.all(items.map(async item => await getArticleById(item.article_id))),
        total,
    } as Table<Article>;
}, [tag_id], {
    tags: ["article"],
    revalidate: 5 * 60,
})();

export const getArticleResolvedById = async (id: UUID) => {
    const article = await getArticleById(id);

    const {items: tags} = await getTagsByArticleId(id);
    const {items: users} = await getUsersByArticleId(id);
    const {items: comments} = await getCommentsByArticleId(id);

    return {
        ...article,
        _tags: tags,
        _users: users,
        _comments: comments,
    } as ArticleResolved;
};

export const getAllArticles = async (offset?: number, limit?: number) => {
    return queryTable<Article>("content", "article", new QueryBuilder<Article>().offset(offset ?? 0).limit(limit ?? null).build());
};
