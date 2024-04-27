import type { ResponsePosts } from "@/types/pages/IndexPageTypes";
import type { PostType } from "@/types/PostType";

const basePath: string = "https://za-halyavoi.ru/api/post";

async function getPosts(
  page: number,
  shopUin?: string,
): Promise<ResponsePosts> {
  let string = "?page=" + page;
  if (shopUin) {
    string += "&shop=" + shopUin;
  }
  const response = await $fetch<ResponsePosts>(basePath + string);

  return response;
}

async function getRecomendedPosts(body: {
  categories: string;
  shop: string;
}): Promise<PostType[]> {
  const response = await $fetch<PostType[]>(basePath + "/recommended", {
    method: "POST",
    body,
  });

  return response;
}

async function likePost(uinPost: string): Promise<void> {
  await $fetch(basePath + "/like/" + uinPost);
}

export default {
  getPosts,
  getRecomendedPosts,
  likePost,
};
