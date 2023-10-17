<template>
  <div class="container flex flex-col lg:flex-row pt-10">
    <main class="lg:w-9/12 mb-10 lg:mb-0 lg:mr-4">
      <m-bread-crumbs :crumbs="breadCrumbs" />
      <h1 class="text-2xl font-bold mb-8 dark:text-zinc-200">
        Промокоды и скидки {{ shopData.title }}
      </h1>

      <div v-if="posts.length" class="mb-20">
        <m-horizontal-card
          v-for="post in posts"
          :key="post.uin"
          :post="post"
          @like="likePost($event)"
        />
      </div>
      <div v-if="!posts.length" class="mb-20">
        <h2 class="text-3xl dark:text-zinc-200 font-bold">
          К сожалению промокодов не найдено, но мы можем предложить промокоды
          <nuxt-link
            class="text-primary underline hover:no-underline"
            to="/alphabet"
            >других магазинов
          </nuxt-link>
        </h2>
      </div>

      <h2 class="text-2xl dark:text-zinc-200 font-bold mb-8">
        Промокоды, похожие на {{ shopData.title }}
      </h2>

      <div class="mb-20">
        <m-horizontal-card
          v-for="post of recommended"
          :key="post.uin"
          show-shop
          :post="post"
          @like="likePost($event)"
        />
      </div>

      <div
        v-if="shopData.shop_description"
        class="prose prose-stone dark:prose-invert mb-10 max-w-none prose-a:bg-[#fdb13c60] prose-a:rounded prose-a:px-1 prose-a:no-underline"
      >
        <h2>Информация о магазине {{ shopData.title }}</h2>
        <div v-html="shopData.shop_description.html"></div>
      </div>
    </main>

    <aside class="lg:w-3/12 mb-10 lg:mb-0 lg:ml-4">
      <div class="">
        <shop-aside :data="shopData" class="mb-10" />

        <m-popular-aside :popular="aside.popular" class="mb-10" />

        <m-popular-categories-aside
          :popular-categories="aside.popularCategories"
          class="mb-8 dark:text-white"
        />
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { UnwrapRef, Ref } from "vue";
import { LocationQueryValue } from "vue-router";
import MBreadCrumbs from "~/components/MBreadCrumbs.vue";
import MPopularAside from "~/components/aside/MPopularAside.vue";
import MHorizontalCard from "~/components/cards/MHorizontalCard.vue";
import ShopAside from "~/components/aside/ShopAside.vue";
import { useSeoStore } from "~/store/seo.store";
import { ShopType } from "~/types/ShopType";
import { PostType } from "~/types/PostType";
import { Crumb } from "~/types/components/BreadcrumbsType";
import { useAsideStore } from "~/store/aside.store";
import MPopularCategoriesAside from "~/components/aside/MPopularCategoriesAside.vue";
import { definePageMeta } from "#imports";

interface SeoType {
  title: string;
  description: string;
}

definePageMeta({
  layout: "shop",
});

const route = useRoute();
const seoStore = useSeoStore();
const aside = useAsideStore();

const page: Ref<UnwrapRef<string | number | LocationQueryValue[]>> = ref(
  route.query.page || 1,
);

const responseShop = await $fetch<ShopType>(
  `https://za-halyavoi.ru/api/shop/${route.params.uin}`,
);
const responsePosts = await $fetch<{ count: number; rows: PostType[] }>(
  `https://za-halyavoi.ru/api/post?shop=${responseShop.uin}&page=${page.value}`,
);
const responseRecommended = await $fetch<PostType[]>(
  "https://za-halyavoi.ru/api/post/recommended",
  {
    method: "POST",
    body: {
      categories: responseShop.categories,
      shop: responseShop.uin,
    },
  },
);
const breadCrumbs: Ref<UnwrapRef<Crumb[]>> = ref([
  { link: "/categories", title: "Категории сайтов" },
  {
    link: `/categories/${responseShop.category.lat_title}`,
    title: responseShop.category.title,
  },
  { title: responseShop.title, link: "" },
]);
/// /////////////////////////////////////////////////

const shopData: Ref<UnwrapRef<ShopType>> = ref(responseShop);
const posts: Ref<UnwrapRef<PostType[]>> = ref(responsePosts.rows);
const seo: Ref<UnwrapRef<SeoType>> = ref({
  title: responseShop.title as string,
  description: responseShop.description as string,
});
const recommended: Ref<UnwrapRef<PostType[]>> = ref(responseRecommended);

function likePost(uin: string) {
  // todo add cookies like
  // const likes = this.$cookies.get('likes')
  // if (!likes) {
  //   // @ts-ignore
  //   await this.$api.get(`/post/like/${uin}`)
  //   // @ts-ignore
  //   this.$cookies.set('likes', [uin])
  //   // @ts-ignore
  //   this.posts.forEach((i: any) => {
  //     if (i.uin === uin) {
  //       i.rating = i.rating + 1
  //     }
  //   })
  // } else {
  //   const findLike = likes.find((i: any) => i === uin)
  //   if (!findLike) {
  //     likes.push(uin)
  //     // @ts-ignore
  //     await this.$api.get(`/post/like/${uin}`)
  //     // @ts-ignore
  //     this.$cookies.set('likes', likes)
  //     // @ts-ignore
  //     this.posts.forEach((i: any) => {
  //       if (i.uin === uin) {
  //         i.rating = i.rating + 1
  //       }
  //     })
  //   }
  // }
}

useHead({
  title: `Промокоды акции и скидки из магазина ${seo.value.title} на ${seoStore.month} ${seoStore.year} год.`,
  meta: [
    {
      hid: "description",
      name: "description",
      content: seo.value.description.slice(0, 346) + "...",
    },
    {
      hid: "keywords",
      name: "keywords",
      content: `сайты, алфавит, промокоды, скидки, акции, магазины, акция, промокод, скидка, ${seo.value.title}, ${seoStore.month}, ${seoStore.year}`,
    },
    {
      property: "og:title",
      content: `Промокоды акции и скидки из магазина ${seo.value.title} на ${seoStore.month} ${seoStore.year} год.`,
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
  link: [
    {
      rel: "canonical",
      href: "https://za-halyavoi.ru/shop/" + route.params.uin,
    },
  ],
});
</script>
