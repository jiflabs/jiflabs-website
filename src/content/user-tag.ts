import {Base} from "@/content/base";
import {getEntityById, queryTable} from "@/util/api";
import {QueryBuilder} from "@/util/query";
import {UUID} from "crypto";
import {unstable_cache} from "next/cache";

export interface UserTag extends Base {
    user_id: UUID,
    tag_id: UUID,
}

export const getUserTagById = async (id: UUID) => unstable_cache(async () => {
    return getEntityById<UserTag>("content", "user_tag", id);
}, [id], {
    tags: ["user_tag"],
    revalidate: 5 * 60,
})();

export const getUserTagsByUserId = async (user_id: UUID) => unstable_cache(async () => {
    return queryTable<UserTag>("content", "user_tag", new QueryBuilder<UserTag>().match("user_id", user_id).build());
}, [user_id], {
    tags: ["user_tag"],
    revalidate: 5 * 60,
})();

export const getUserTagsByTagId = async (tag_id: UUID) => unstable_cache(async () => {
    return queryTable<UserTag>("content", "user_tag", new QueryBuilder<UserTag>().match("tag_id", tag_id).build());
}, [tag_id], {
    tags: ["user_tag"],
    revalidate: 5 * 60,
})();

export const getAllUserTags = async (offset?: number, limit?: number) => {
    return queryTable<UserTag>("content", "user_tag", new QueryBuilder<UserTag>().offset(offset ?? 0).limit(limit ?? null).build());
};
