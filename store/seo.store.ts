import { defineStore } from "pinia";

const months: string[] = [
  "январь",
  "февраль",
  "март",
  "апрель",
  "май",
  "июнь",
  "июль",
  "август",
  "сентябрь",
  "октябрь",
  "ноябрь",
  "декабр",
];

export const useSeoStore = defineStore({
  id: "seo",
  state: () => ({
    year: "",
    month: "",
  }),
  actions: {
    setState(): void {
      const dateNow = new Date();
      console.log(dateNow.getMonth());
      this.month = months[dateNow.getMonth() - 1];
      this.year = String(dateNow.getFullYear());
    },
  },
});
