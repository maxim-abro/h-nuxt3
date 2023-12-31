import { ShopDescriptionType } from "~/types/ShopDescriptionType";
import { CategoryType } from "~/types/CategoryType";

export interface ShopType {
  id?: number;
  uin?: string;
  title: string;
  description: string;
  image: string;
  contacts: string;
  url: string;
  dostavka: string;
  tags: string;
  categories: string;
  counter: number;
  lat_title: string;
  shop_description: ShopDescriptionType;
  category: CategoryType;
}
