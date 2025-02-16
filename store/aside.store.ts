import { defineStore } from "pinia";
import axios from "axios";
import { PopularCategoriesType } from "~/types/PopularCategoriesType";

export const useAsideStore = defineStore({
  id: "aside",
  state: () => ({
    popular: [] as any,
    popularCategories: [] as PopularCategoriesType[],
  }),
  getters: {},
  actions: {
    setPopular(val: object): void {
      this.popular = val;
    },
    setPopularCategories(categories: PopularCategoriesType[]): void {
      this.popularCategories = categories;
    },
    async getPopularPosts(): Promise<void> {
      try {
        const resData = await axios.get<object>(
          "https://za-halyavoi.ru/api/popularshops",
        );
        this.setPopular(resData.data);
      } catch (e) {
        console.log(e);
      }
    },
    async getPopularCategories(): Promise<void> {
      try {
        const resData = await axios.get<PopularCategoriesType[]>(
          "https://za-halyavoi.ru/api/category/popular",
        );
        this.setPopularCategories(resData.data);
      } catch (e) {
        console.log(e);
      }
    },
    async getBuild(): Promise<void> {
      const resData = await axios.get("https://za-halyavoi.ru/api/build/site");
      this.setPopular(resData.data.shops);
      this.setPopularCategories(resData.data.categories);
    },
  },
});
