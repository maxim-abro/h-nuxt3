<template>
  <div class="">
    <m-bread-crumbs :crumbs="breadCrumbs" />
    <h1 class="text-lg xl:text-3xl font-bold my-8">
      <nuxt-icon name="magnifying-glass" class="text-primary" />
      Результаты поиска по запросу: "{{ dataq }}"
    </h1>

    <div
      v-if="searchData.length"
      class="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3"
    >
      <nuxt-link
        v-for="shop of searchData"
        :key="shop.uin"
        :to="`/shop/${shop.lat_title}`"
        class=""
      >
        <img
          :title="shop.title"
          loading="lazy"
          :src="shop.image"
          :alt="shop.title"
          class="w-full h-auto"
        />
        <h2 class="text-center">{{ shop.title }}</h2>
      </nuxt-link>
    </div>
    <div v-if="!searchData.length" class="font-medium text-lg">
      Ничего не найдено по запросу "{{ dataq }}"
    </div>
  </div>
</template>

<script setup lang="ts">
import { LocationQueryValue } from "vue-router";
import { ShopsSearchType } from "~/types/components/HeaderSearchType";
import MBreadCrumbs from "~/components/MBreadCrumbs.vue";
import { Crumb } from "~/types/components/BreadcrumbsType";
import { useSeoStore } from "~/store/seo.store";

const route = useRoute();
const seo = useSeoStore();

const response = await $fetch<ShopsSearchType[]>(
  encodeURI(`https://za-halyavoi.ru/api/search?q=${route.query.q}`),
);

const searchData = ref<ShopsSearchType[]>(response);
const dataq = ref<LocationQueryValue | LocationQueryValue[]>(
  route.query.q,
);
const breadCrumbs = ref<Crumb[]>([
  {
    title: `Результаты поиска "${route.query.q}"`,
    link: "",
  },
]);

useHead({
  title: `Промокоды, скидки и акции для сайтов и интернет-магазинов на ${seo.month} ${seo.year} год поиск по магазинам ${dataq.value}`,
  meta: [
    {
      hid: "description",
      name: "description",
      content: `Свежие промокоды, скидки и акции на ${seo.month} ${seo.year} год, а также эксклюзивные купоны. Бегом za халявой!`,
    },
    {
      hid: "keywords",
      name: "keywords",
      content:
        "сайты, промокоды, скидки, акции, магазины, акция, промокод, скидка",
    },
    {
      property: "og:title",
      content: `Промокоды, скидки и акции для сайтов и интернет-магазинов на ${seo.month} ${seo.year} год поиск по магазинам ${dataq.value}`,
    },
    {
      property: "og:description",
      content: `Свежие промокоды, скидки и акции на ${seo.month} ${seo.year} год, а также эксклюзивные купоны. Бегом za халявой!`,
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
      href: "https://za-halyavoi.ru/search",
    },
  ],
});
</script>
