import {Base} from "@/content/base";
import {getEntityById, queryTable} from "@/util/api";
import {QueryBuilder} from "@/util/query";
import {UUID} from "crypto";
import {unstable_cache} from "next/cache";

export interface ArticleTag extends Base {
    article_id: UUID,
    tag_id: UUID,
}

export const getArticleTagById = async (id: UUID) => unstable_cache(async () => {
    return getEntityById<ArticleTag>("content", "article_tag", id);
}, [id], {
    tags: ["article_tag"],
    revalidate: 5 * 60,
})();

export const getArticleTagsByArticleId = async (article_id: UUID) => unstable_cache(async () => {
    return queryTable<ArticleTag>("content", "article_tag", new QueryBuilder<ArticleTag>().match("article_id", article_id).build());
}, [article_id], {
    tags: ["article_tag"],
    revalidate: 5 * 60,
})();

export const getArticleTagsByTagId = async (tag_id: UUID) => unstable_cache(async () => {
    return queryTable<ArticleTag>("content", "article_tag", new QueryBuilder<ArticleTag>().match("tag_id", tag_id).build());
}, [tag_id], {
    tags: ["article_tag"],
    revalidate: 5 * 60,
})();

export const getAllArticleTags = async (offset?: number, limit?: number) => {
    return queryTable<ArticleTag>("content", "article_tag", new QueryBuilder<ArticleTag>().offset(offset ?? 0).limit(limit ?? null).build());
};
