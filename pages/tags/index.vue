<template>
  <div class="">
    <MBreadCrumbs :crumbs="breadCrumbs" />
    <h1 class="text-3xl font-bold">Все теги</h1>
    <div class="flex flex-wrap gap-2">
      <nuxt-link
        v-for="h of holidays"
        :key="h.id_holiday"
        :to="`/tags/${h.lat_title}`"
        class="bg-zinc-200 hover:bg-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 px-2 py-1"
        >{{ h.title }}</nuxt-link
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref, UnwrapRef } from "vue";
import MBreadCrumbs from "~/components/MBreadCrumbs.vue";
import { HolidayType } from "~/types/HolidayType";
import { Crumb } from "~/types/components/BreadcrumbsType";
import { useSeoStore } from "~/store/seo.store";

const route = useRoute();
const seo = useSeoStore();

const responseHolidays = await $fetch<HolidayType[]>(
  "https://za-halyavoi.ru/api/holiday/all",
);
const breadCrumbs: Ref<UnwrapRef<Crumb[]>> = ref([
  {
    title: "Теги",
    link: "",
  },
]);
const holidays: Ref<UnwrapRef<HolidayType[]>> = ref(responseHolidays);

useHead({
  title: `Сезонные скидки. Промокоды, скидки и акции для сайтов и интернет-магазинов на ${seo.month} ${seo.year} год`,
  meta: [
    {
      hid: "description",
      name: "description",
      content: `Сезонные скидки. Свежие промокоды, скидки и акции на ${seo.month} ${seo.year} год, а также эксклюзивные купоны. Бегом za халявой!`,
    },
    {
      hid: "keywords",
      name: "keywords",
      content: `сезонные скидки, сезонная скидка, сайты, промокоды, скидки, акции, магазины, акция, промокод, скидка, ${seo.month}`,
    },
    {
      property: "og:title",
      content: `Сезонные скидки. Промокоды, скидки и акции для сайтов и интернет-магазинов на ${seo.month} ${seo.year} год`,
    },
    {
      property: "og:description",
      content: `Сезонные скидки. Свежие промокоды, скидки и акции на ${seo.month} ${seo.year} год, а также эксклюзивные купоны. Бегом za халявой!`,
    },
    {
      property: "og:url",
      content: `https://za-halyavoi.ru${route.fullPath}`,
    },
    {
      property: "og:image",
      content: "https://za-halyavoi.ru/logo.png",
    },
    {
      property: "og:type",
      content: "article",
    },
    {
      property: "og:site_name",
      content: "за халявой",
    },
    {
      property: "og:image:url",
      content: "https://za-halyavoi.ru/logo.png",
    },
  ],
  link: [
    {
      rel: "canonical",
      href: "https://za-halyavoi.ru/tags",
    },
  ],
});
</script>
