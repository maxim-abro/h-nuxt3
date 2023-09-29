import { usePopupStore } from "~/store/popup.store";

export default async function (to: any): Promise<void> {
  const popup = usePopupStore();
  if (to.query.coupon) {
    await popup.getPost(String(to.query.coupon));
    // await store.dispatch('popup/getPost', route.query.coupon)
  }
}
