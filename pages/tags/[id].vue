<template>
  <div class="">
    <m-bread-crumbs :crumbs="breadCrumbs" />
    <h1 class="text-2xl font-bold mb-8">
      Промокоды и акции на тему {{ holiday.title }}
    </h1>
    <img
      :title="holiday.title"
      loading="lazy"
      class="w-full mb-8 rounded"
      :src="`https://za-halyavoi.ru/api/static/holidays/${holiday.image}`"
      :alt="holiday.title"
    />

    <p class="mb-8" v-html="holiday.description"></p>

    <h2 class="font-bold text-lg mb-4">
      <nuxt-icon name="fire" class="text-primary" /> {{ holiday.title }} -
      лучшие промокоды и акции
    </h2>

    <div class="grid grid-cols-1 xs:grid-cols-2 xl:grid-cols-3 gap-8 mb-8">
      <m-vertical-card
        v-for="post in holiday.posts"
        :key="post.uin"
        :post="post"
        @like="likePost($event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import MBreadCrumbs from "~/components/MBreadCrumbs.vue";
import MVerticalCard from "~/components/cards/MVerticalCard.vue";
import { useSeoStore } from "~/store/seo.store";
import { HolidayType } from "~/types/HolidayType";
import { Ref } from "@vue/reactivity";
import { UnwrapRef } from "vue";
import { Crumb } from "~/types/components/BreadcrumbsType";

const route = useRoute();
const seo = useSeoStore();

const responseHoliday = await $fetch<HolidayType>(
  `https://za-halyavoi.ru/api/holiday/id/${route.params.id}`,
);
const holiday: Ref<UnwrapRef<HolidayType>> = ref(responseHoliday);
const breadCrumbs: Ref<UnwrapRef<Crumb[]>> = ref([
  { link: "/tags", title: "Теги" },
  { title: holiday.value.title, link: "" },
]);

async function likePost(uin: string) {
  // todo like
  // // @ts-ignore
  // const likes = this.$cookies.get('likes')
  // if (!likes) {
  //   // @ts-ignore
  //   await this.$api.get(`/post/like/${uin}`)
  //   // @ts-ignore
  //   this.$cookies.set('likes', [uin])
  //   // @ts-ignore
  //   holiday.value.posts.forEach((i) => {
  //     if (i.uin === uin) {
  //       i.rating = i.rating + 1
  //     }
  //   })
  // } else {
  //   const findLike = likes.find((i) => i === uin)
  //   if (!findLike) {
  //     likes.push(uin)
  //     // @ts-ignore
  //     await this.$api.get(`/post/like/${uin}`)
  //     // @ts-ignore
  //     this.$cookies.set('likes', likes)
  //     // @ts-ignore
  //     holiday.value.posts.forEach((i) => {
  //       if (i.uin === uin) {
  //         i.rating = i.rating + 1
  //       }
  //     })
  //   }
  // }
}

useHead({
  title: `${holiday.value.title}. Промокоды, скидки и акции для сайтов и интернет-магазинов`,
  meta: [
    {
      hid: "description",
      name: "description",
      content: holiday.value.description.slice(0, 346),
    },
    {
      hid: "keywords",
      name: "keywords",
      content: `сайты, промокоды, скидки, акции, магазины, акция, промокод, скидка, ${holiday.value.title}`,
    },
    {
      property: "og:title",
      content: `${holiday.value.title}. Промокоды, скидки и акции для сайтов и интернет-магазинов`,
    },
    {
      property: "og:description",
      content: holiday.value.description,
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
      // @ts-ignore
      href: "https://za-halyavoi.ru/tags/" + route.params.id,
    },
  ],
});
</script>
