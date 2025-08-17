import {Article, getArticlesByUserId} from "@/content/article";
import {getArticleUsersByArticleId} from "@/content/article-user";
import {Base} from "@/content/base";
import {Comment, getCommentsByUserId} from "@/content/comment";
import {getTagsByUserId, Tag} from "@/content/tag";
import {getUserTagsByTagId} from "@/content/user-tag";
import {getEntityById, queryTable} from "@/util/api";
import {QueryBuilder} from "@/util/query";
import {Table} from "@/util/type";
import {UUID} from "crypto";
import {unstable_cache} from "next/cache";

export interface User extends Base {
    name: string,
    email: string,
    profile: string | null,
    first_name: string | null,
    last_name: string | null,
    show_name: boolean,
    biography: string | null,
    join_date: number,
    verified: boolean,
}

export interface UserResolved extends User {
    _tags: Tag[],
    _articles: Article[],
    _comments: Comment[],
}

export const getUserById = async (id: UUID) => unstable_cache(async () => {
    return getEntityById<User>("content", "user", id);
}, [id], {
    tags: ["user"],
    revalidate: 5 * 60,
})();

export const getUsersByArticleId = async (article_id: UUID) => unstable_cache(async () => {
    const {items, total} = await getArticleUsersByArticleId(article_id);

    return {
        items: await Promise.all(items.map(async item => await getUserById(item.user_id))),
        total,
    } as Table<User>;
}, [article_id], {
    tags: ["user"],
    revalidate: 5 * 60,
})();

export const getUsersByTagId = async (tag_id: UUID) => unstable_cache(async () => {
    const {items, total} = await getUserTagsByTagId(tag_id);

    return {
        items: await Promise.all(items.map(async item => await getUserById(item.user_id))),
        total,
    } as Table<User>;
}, [tag_id], {
    tags: ["user"],
    revalidate: 5 * 60,
})();

export const getUserResolvedById = async (id: UUID) => {
    const user = await getUserById(id);

    const {items: tags} = await getTagsByUserId(id);
    const {items: articles} = await getArticlesByUserId(id);
    const {items: comments} = await getCommentsByUserId(id);

    return {
        ...user,
        _tags: tags,
        _articles: articles,
        _comments: comments,
    } as UserResolved;
};

export const getAllUsers = async (offset?: number, limit?: number) => {
    return queryTable<User>("content", "user", new QueryBuilder<User>().offset(offset ?? 0).limit(limit ?? null).build());
};
