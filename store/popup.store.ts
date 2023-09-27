import {defineStore, StoreDefinition} from "pinia";
import {PostType} from "~/types/PostType";
import axios, {AxiosResponse} from "axios";

export const usePopupStore = defineStore({
  id: 'popup',
  state: () => ({
    openPopup: false as boolean,
    popupData: {} as PostType,
    openCats: false as boolean,
    openMobileMenu: false as boolean,
  }),
  getters: {},
  actions: {
    setPopupData(popupData: PostType):void {
      this.popupData = popupData
    },
    closePopup() :void {
      this.openPopup = false
    },
    toggleCats():void {
      this.openCats = !this.openCats
    },
    toggleMenu():void {
      this.openMobileMenu = !this.openMobileMenu
    },
    async getPost(uin: string):Promise<PostType|any> {
      try {
        const resData:AxiosResponse<PostType> = await axios.get(`https://za-halyavoi.ru/api/post/${uin}`)
        this.setPopupData(resData.data)
        this.openPopup = true
        return resData.data
      } catch (e:any) {
        console.log(e)
        return e
      }
    }
  }
})
