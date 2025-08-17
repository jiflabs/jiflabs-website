import {Base} from "@/content/base";
import {getEntityById, queryTable} from "@/util/api";
import {QueryBuilder} from "@/util/query";
import {UUID} from "crypto";
import {unstable_cache} from "next/cache";

export interface ArticleUser extends Base {
    article_id: UUID,
    user_id: UUID,
}

export const getArticleUserById = async (id: UUID) => unstable_cache(async () => {
    return getEntityById<ArticleUser>("content", "article_user", id);
}, [id], {
    tags: ["article_user"],
    revalidate: 5 * 60,
})();

export const getArticleUsersByArticleId = async (article_id: UUID) => unstable_cache(async () => {
    return queryTable<ArticleUser>("content", "article_user", new QueryBuilder<ArticleUser>().match("article_id", article_id).build());
}, [article_id], {
    tags: ["article_user"],
    revalidate: 5 * 60,
})();

export const getArticleUsersByUserId = async (user_id: UUID) => unstable_cache(async () => {
    return queryTable<ArticleUser>("content", "article_user", new QueryBuilder<ArticleUser>().match("user_id", user_id).build());
}, [user_id], {
    tags: ["article_user"],
    revalidate: 5 * 60,
})();

export const getAllArticleUsers = async (offset?: number, limit?: number) => {
    return queryTable<ArticleUser>("content", "article_user", new QueryBuilder<ArticleUser>().offset(offset ?? 0).limit(limit ?? null).build());
};
