import type { ShopType } from "@/types/ShopType";

const basePath: string = "https://za-halyavoi.ru/api/shop";
async function getShopById(uinShop: string): Promise<ShopType> {
  const response = await $fetch<ShopType>(basePath + "/" + uinShop);
  return response;
}

async function getAllShops(): Promise<ShopType[]> {
  const response = await $fetch<ShopType[]>(basePath);
  return response;
}

async function getShopsBySymbol(symbol: string): Promise<ShopType[]> {
  const response = await $fetch<ShopType[]>(
    basePath + "/symbol/" + encodeURI(symbol.toLowerCase()),
  );
  return response;
}

export default {
  getShopById,
  getAllShops,
  getShopsBySymbol,
};
