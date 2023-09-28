import { defineStore } from "pinia";
import {PopularCategoriesType} from "~/types/PopularCategoriesType";
import axios, {AxiosResponse} from "axios";

export const useAsideStore = defineStore({
  id: 'aside',
  state: () => ({
    popular: [] as any,
    popularCategories: [] as PopularCategoriesType[],
  }),
  getters: {

  },
  actions: {
    setPopular(val: object):void {
      this.popular = val
    },
    setPopularCategories(categories: PopularCategoriesType[]):void {
      this.popularCategories = categories
    },
    async getPopularPosts():Promise<void> {
      try {
        const resData:AxiosResponse<object> = await axios.get('https://za-halyavoi.ru/api/popularshops')
        this.setPopular(resData.data)
      } catch (e) {
        console.log(e)
      }
    },
    async getPopularCategories():Promise<void> {
      try {
        const resData:AxiosResponse<PopularCategoriesType[]> = await axios.get('https://za-halyavoi.ru/api/category/popular')
        this.setPopularCategories(resData.data)
      } catch (e) {
        console.log(e)
      }
    },
    async getBuild(): Promise<void> {
      const resData = await axios.get('https://za-halyavoi.ru/api/build/site')
      this.setPopular(resData.data.shops)
      this.setPopularCategories(resData.data.categories)
    }
  },
})
