import {PostType} from "~/types/PostType";

export interface HolidayType {
  id_holiday: number
  title: string
  description: string
  image: string
  lat_title: string
  posts: PostType[]
}
