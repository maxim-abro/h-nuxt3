<template>
  <div class="">
    <m-bread-crumbs :crumbs="breadCrumbs" />
    <h1 class="text-2xl font-bold mb-8">
      Добавление вашего купона для "{{ seo.title }}"
    </h1>

    <img
      loading="lazy"
      :src="`https://za-halyavoi.ru/api/static/${shop.image}`"
      :alt="seo.title"
    />

    <form action="">
      <div class="grid grid-cols-2 gap-8 mb-8">
        <div class="">
          <div class="font-bold">Промокод</div>
          <m-input type="text" />
          <small>Оставьте поле пустым, если промокод не требуется</small>
        </div>

        <div class="">
          <div class="font-bold">Дата окончания акции</div>
          <m-input type="date" />
        </div>
      </div>

      <div class="font-bold">Описание акции</div>
      <textarea
        class="rounded p-2 box-border w-full focus:outline-0 focus:ring focus:ring-primary placeholder-zinc-800 text-zinc-900 bg-gray-200"
      ></textarea>
      <small>Минимум 10 символов</small>

      <div
        id="captcha-container"
        style="height: 100px"
        class="smart-captcha"
        data-sitekey="d8jFIYYKucfxlyJcqWWOshC5fOjXZkDfZyweKSTf"
      ></div>
    </form>
  </div>
</template>

<script setup lang="ts">
import shopService from "~/services/shops";
import MBreadCrumbs from "~/components/MBreadCrumbs.vue";
import MInput from "~/components/_core/MInput.vue";
import { useSeoStore } from "~/store/seo.store";
import { ShopType } from "~/types/ShopType";
import { Crumb } from "~/types/components/BreadcrumbsType";

interface SeoType {
  title: string;
  description: string;
}

const route = useRoute();
const seoStore = useSeoStore();

const responseShop = await shopService.getShopById(String(route.params.uin));

const breadCrumbs = ref<Crumb[]>([
  { link: "/categories", title: "Категории сайтов" },
  {
    link: `/categories/${responseShop.category.lat_title}`,
    title: responseShop.category.title,
  },
  { link: `/shop/${route.params.uin}`, title: responseShop.title },
  { title: "Добавление купона", link: "" },
]);
const shop = ref<ShopType>(responseShop);
const seo = ref<SeoType>({
  title: responseShop.title,
  description: responseShop.description,
});

useHead({
  title: `Добавить промокод для магазина ${seo.value.title} на ${seoStore.month} ${seoStore.year} год.`,
  meta: [
    {
      hid: "description",
      name: "description",
      content:
        seo.value.description.slice(0, 300) + "..." + " добавление промокода.",
    },
    {
      hid: "keywords",
      name: "keywords",
      content: `сайты, алфавит, промокоды, скидки, акции, магазины, акция, промокод, скидка, ${seo.value.title}, ${seoStore.month}, ${seoStore.year}`,
    },
    {
      property: "og:title",
      content: `Добавить промокод для магазина ${seo.value.title} на ${seoStore.month} ${seoStore.year} год.`,
    },
    {
      property: "og:description",
      content: seo.value.description,
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
  script: [
    {
      src: "https://captcha-api.yandex.ru/captcha.js",
      defer: true,
    },
  ],
  link: [
    {
      rel: "canonical",
      // @ts-ignore
      href: "https://za-halyavoi.ru/shop/add/" + route.params.uin,
    },
  ],
});
</script>
