import {Article, getArticlesByTagId} from "@/content/article";
import {getArticleTagsByArticleId} from "@/content/article-tag";
import {Base} from "@/content/base";
import {getUsersByTagId, User} from "@/content/user";
import {getUserTagsByUserId} from "@/content/user-tag";
import {getEntityById, queryTable} from "@/util/api";
import {QueryBuilder} from "@/util/query";
import {Table} from "@/util/type";
import {UUID} from "crypto";
import {unstable_cache} from "next/cache";

export interface Tag extends Base {
    label: string,
}

export interface TagResolved extends Tag {
    _articles: Article[],
    _users: User[],
}

export const getTagById = async (id: UUID) => unstable_cache(async () => {
    return getEntityById<Tag>("content", "tag", id);
}, [id], {
    tags: ["tag"],
    revalidate: 5 * 60,
})();

export const getTagsByArticleId = async (article_id: UUID) => unstable_cache(async () => {
    const {items, total} = await getArticleTagsByArticleId(article_id);

    return {
        items: await Promise.all(items.map(async item => getTagById(item.tag_id))),
        total,
    } as Table<Tag>;
}, [article_id], {
    tags: ["tag"],
    revalidate: 5 * 60,
})();

export const getTagsByUserId = async (user_id: UUID) => unstable_cache(async () => {
    const {items, total} = await getUserTagsByUserId(user_id);

    return {
        items: await Promise.all(items.map(async item => getTagById(item.tag_id))),
        total,
    } as Table<Tag>;
}, [user_id], {
    tags: ["tag"],
    revalidate: 5 * 60,
})();

export const getTagResolvedById = async (id: UUID) => {
    const tag = await getTagById(id);

    const {items: articles} = await getArticlesByTagId(id);
    const {items: users} = await getUsersByTagId(id);

    return {
        ...tag,
        _articles: articles,
        _users: users,
    } as TagResolved;
};

export const getAllTags = async (offset?: number, limit?: number) => {
    return queryTable<Tag>("content", "tag", new QueryBuilder<Tag>().offset(offset ?? 0).limit(limit ?? null).build());
};
