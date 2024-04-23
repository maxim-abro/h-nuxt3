import { defineStore } from "pinia";

export const useSeoStore = defineStore({
  id: "seo",
  state: () => ({
    year: "2024",
    month: "апрель",
  }),
});
