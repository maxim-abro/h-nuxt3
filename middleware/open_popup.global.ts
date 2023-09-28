import {usePopupStore} from "~/store/popup.store";
import {useRoute} from "vue-router";



export default async function (to:any):Promise<void> {
  console.log(to)
  const popup = usePopupStore()
  if (to.query.coupon) {
    await popup.getPost(String(to.query.coupon))
    // await store.dispatch('popup/getPost', route.query.coupon)
  }
}
