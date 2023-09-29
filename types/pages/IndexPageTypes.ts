import { PostType } from "~/types/PostType";

export interface ResponsePosts {
  count: number;
  rows: PostType[];
}
