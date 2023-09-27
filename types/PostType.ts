import {ShopType} from "~/types/ShopType";

export interface PostType {
  id?: number
  uin?: string
  title: string
  description: string
  type: string
  shopUin: string
  endDate: string
  url: string
  code: string
  query: string
  rating: number
  category: string
  shop: ShopType
  recomended: number | boolean
  counter: number
}
