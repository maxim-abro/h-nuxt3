<template>
  <div class="">
    <m-bread-crumbs :crumbs="breadCrumbs" />
    <h1 class="text-2xl lg:text-3xl font-bold mb-4">
      <nuxt-icon name="header/braille" class="text-primary mr-1" /> Все
      предложения по скидкам
    </h1>
    <h2 class="text-xl lg:text-2xl font-bold mb-3">
      Найдите интересующий вас сайт по категории:
    </h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-1">
      <nuxt-link
        v-for="category in categories"
        :key="category.uin"
        :to="`/categories/${category.lat_title}`"
        class="w-full pl-1 text-xl font-light py-1 hover:bg-zinc-700 hover:text-primary duration-75 whitespace-nowrap overflow-ellipsis overflow-hidden"
      >
        <nuxt-icon :name="`category/${category.icon}`" class="mr-3 w-4" />{{
          category.title
        }}
      </nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import MBreadCrumbs from "~/components/MBreadCrumbs.vue";
import { useSeoStore } from "~/store/seo.store";
import { Ref } from "@vue/reactivity";
import { UnwrapRef } from "vue";
import { CategoryType } from "~/types/CategoryType";
import { Crumb } from "~/types/components/BreadcrumbsType";

const route = useRoute();
const seo = useSeoStore();

const response = await $fetch<CategoryType[]>(
  "https://za-halyavoi.ru/api/category",
);
const categories: Ref<UnwrapRef<CategoryType[]>> = ref(response);

const breadCrumbs: Crumb[] = [
  {
    title: "Категории сайтов",
    link: "",
  },
];

useHead({
  title: `Промокоды, скидки акции по категориям на ${seo.month} ${seo.month} год.`,
  meta: [
    {
      hid: "description",
      name: "description",
      // @ts-ignore
      content: `Промокоды и скидки по категориям - Свежие промокоды, скидки и акции на ${seo.month} ${seo.year} год, а также эксклюзивные купоны. Бегом za халявой!`,
    },
    {
      hid: "keywords",
      name: "keywords",
      content:
        "сайты, категории, алфавит, промокоды, скидки, акции, магазины, акция, промокод, скидка",
    },
    {
      property: "og:title",
      // @ts-ignore
      content: `Промокоды, скидки акции по категориям на ${seo.month} ${seo.month} год.`,
    },
    {
      property: "og:description",
      // @ts-ignore
      content: `Промокоды и скидки по категориям - Свежие промокоды, скидки и акции на ${seo.month} ${seo.year} год, а также эксклюзивные купоны. Бегом za халявой!`,
    },
    {
      property: "og:url",
      // @ts-ignore
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
      href: "https://za-halyavoi.ru/categories",
    },
  ],
});
</script>
