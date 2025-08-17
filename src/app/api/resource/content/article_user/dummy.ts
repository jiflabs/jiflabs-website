import {ArticleUser} from "@/content/article-user";

const dummy = [
    {
        id: "b622156c-ad12-4258-bee6-5142ba2c88d1",
        article_id: "1552b9ee-b2c9-4fb6-8382-6c89c8d61c78",
        user_id: "3199d4aa-7722-40cc-a17f-0118e7b6e746",
    },
    {
        id: "ef2c4c72-356e-4466-a4ad-a1f6b57fc7cd",
        article_id: "72806ddd-de27-41c8-92b8-c1769a577ccd",
        user_id: "27430725-f16e-47eb-9fe0-b2346f48045b",
    },
    {
        id: "3225b1c7-b5c5-4505-917f-d14ede965406",
        article_id: "39282aee-a789-49d5-a293-057cf3cafd3c",
        user_id: "3199d4aa-7722-40cc-a17f-0118e7b6e746",
    },
    {
        id: "24fceba1-c83c-4dfc-b485-d2b964b0d2a2",
        article_id: "a5476912-5c71-4f9b-8ba7-d8a27afbf4c7",
        user_id: "3199d4aa-7722-40cc-a17f-0118e7b6e746",
    },
    {
        id: "c5477c8e-7355-493d-83f3-908da068d4a4",
        article_id: "452f8664-03df-45d2-b223-aec5cd00b0d3",
        user_id: "099d7e9b-47d9-48bf-8bc7-b330e0a7b9e7",
    },
    {
        id: "836753d4-3cbd-4614-b538-a1d6cc3d1408",
        article_id: "f80a73e0-8318-4ef2-ae53-3a775ae4e3a2",
        user_id: "099d7e9b-47d9-48bf-8bc7-b330e0a7b9e7",
    },
    {
        id: "3921de3d-91f4-4492-a4c0-815b8992545f",
        article_id: "c05f5136-dce4-4068-bb7f-d0684c6f271f",
        user_id: "099d7e9b-47d9-48bf-8bc7-b330e0a7b9e7",
    },
    {
        id: "9f992c0e-0def-4d80-9fc7-7988fc66e209",
        article_id: "b559e770-d8f3-43a3-afd1-783535627339",
        user_id: "099d7e9b-47d9-48bf-8bc7-b330e0a7b9e7",
    },
    {
        id: "e5c869c2-8efb-4eaf-8cea-4b6e2a593682",
        article_id: "c93bf8ff-f9fe-41c7-a2c9-31711512d5cf",
        user_id: "83b693c0-1d2f-4c23-b8b0-a55acc388deb",
    },
    {
        id: "dbbb427c-b96f-4d56-9f1f-ce8d729e6b99",
        article_id: "036a2ea5-9425-4b35-9b30-5d2048d6d7d8",
        user_id: "83b693c0-1d2f-4c23-b8b0-a55acc388deb",
    },
    {
        id: "ca600a37-2540-4a16-b39d-66a117f62f58",
        article_id: "fb993f96-4181-4433-8ce9-b233690e12de",
        user_id: "83b693c0-1d2f-4c23-b8b0-a55acc388deb",
    },
    {
        id: "efd3ce47-7879-4520-9019-872c084f7dcc",
        article_id: "7507dd57-97bf-432d-8c38-d1afef1eb1ef",
        user_id: "099d7e9b-47d9-48bf-8bc7-b330e0a7b9e7",
    },
    {
        id: "fbace0ac-915a-45bb-b061-2157ef534a5f",
        article_id: "91a3bbe7-7be9-4bf7-a06a-18673e343765",
        user_id: "83b693c0-1d2f-4c23-b8b0-a55acc388deb",
    },
    {
        id: "8de05704-2efb-4eea-b089-8e75d95fa512",
        article_id: "4f8f4d61-0e1e-428d-bf9a-831e909d9c6a",
        user_id: "83b693c0-1d2f-4c23-b8b0-a55acc388deb",
    },
    {
        id: "300a0193-1548-43d3-9d53-897d1b2b57d8",
        article_id: "124d1abd-7b64-4bd4-8d64-490062d1ea91",
        user_id: "83b693c0-1d2f-4c23-b8b0-a55acc388deb",
    },
    {
        id: "55de5e18-546f-4b28-a9de-73c4ec0100fa",
        article_id: "aa22bfcc-cf9a-4fd1-8610-baa66b6629ed",
        user_id: "83b693c0-1d2f-4c23-b8b0-a55acc388deb",
    },
    {
        id: "4b3593fc-572b-4b9a-bf76-717ad4689069",
        article_id: "fe682a60-74b9-480f-998d-c35d2037ebe9",
        user_id: "4d8c6c82-67a6-43f2-90a7-40af94f4bded",
    },
    {
        id: "253a0f6b-0157-4f56-8510-25aedf951d20",
        article_id: "219aeff4-85bb-4050-a7ca-930535db2401",
        user_id: "4d8c6c82-67a6-43f2-90a7-40af94f4bded",
    },
    {
        id: "5df18a4f-1cb0-47b9-beee-877795e54d76",
        article_id: "00b903a1-fdc7-4f9b-b17d-ee64e7f9ac84",
        user_id: "4d8c6c82-67a6-43f2-90a7-40af94f4bded",
    },
    {
        id: "4dabdb44-832a-4fde-9223-5204bf3cf2eb",
        article_id: "549bae74-3582-487c-b3a2-6273f84ce022",
        user_id: "4d8c6c82-67a6-43f2-90a7-40af94f4bded",
    },
    {
        id: "9c331934-a9cf-4e44-afdd-b615576940fc",
        article_id: "1552b9ee-b2c9-4fb6-8382-6c89c8d61c78",
        user_id: "099d7e9b-47d9-48bf-8bc7-b330e0a7b9e7",
    },
    {
        id: "c6d5f643-70e7-445b-b646-4a4449986200",
        article_id: "1552b9ee-b2c9-4fb6-8382-6c89c8d61c78",
        user_id: "83b693c0-1d2f-4c23-b8b0-a55acc388deb",
    },
    {
        id: "ebbc1fe3-93bd-4f9d-bcc9-09e74d8d20fa",
        article_id: "4f8f4d61-0e1e-428d-bf9a-831e909d9c6a",
        user_id: "099d7e9b-47d9-48bf-8bc7-b330e0a7b9e7",
    },
    {
        id: "c34d5308-c1db-48a3-8194-2df84b060b8c",
        article_id: "c05f5136-dce4-4068-bb7f-d0684c6f271f",
        user_id: "83b693c0-1d2f-4c23-b8b0-a55acc388deb",
    },
    {
        id: "5d526aad-1754-4a50-95e7-224dd69705aa",
        article_id: "39282aee-a789-49d5-a293-057cf3cafd3c",
        user_id: "27430725-f16e-47eb-9fe0-b2346f48045b",
    },
] as ArticleUser[];

export default dummy;
