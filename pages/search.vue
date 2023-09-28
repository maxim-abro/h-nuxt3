<template>
  <div class="">
    <m-bread-crumbs
      :crumbs="breadCrumbs"
    />
    <h1 class="text-lg xl:text-3xl font-bold my-8">
      <nuxt-icon name="magnifying-glass" class="text-primary"/>
      Результаты поиска по запросу: "{{ dataq }}"
    </h1>

    <div class="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3" v-if="searchData.length">
      <nuxt-link :to="`/shop/${shop.lat_title}`" class="" v-for="shop of searchData" :key="shop.uin">
        <img :title='shop.title' loading='lazy' :src="`https://za-halyavoi.ru/api/static/${shop.image}`" :alt="shop.title" class="w-full h-auto">
        <h2 class="text-center">{{ shop.title }}</h2>
      </nuxt-link>
    </div>
    <div class="font-medium text-lg" v-if="!searchData.length">
      Ничего не найдено по запросу "{{ dataq }}"
    </div>
  </div>
</template>

<script setup lang="ts">
import MBreadCrumbs from '~/components/MBreadCrumbs.vue'
import {ShopsSearchType} from "~/types/components/HeaderSearchType";
import {Ref} from "@vue/reactivity";
import {UnwrapRef} from "vue";
import {LocationQueryValue} from "vue-router";
import {Crumb} from "~/types/components/BreadcrumbsType";
import {useSeoStore} from "~/store/seo.store";

const route = useRoute()
const router = useRouter()
const seo = useSeoStore()

const response = await $fetch<ShopsSearchType[]>(encodeURI(`https://za-halyavoi.ru/api/search?q=${route.query.q}`))

const searchData:Ref<UnwrapRef<ShopsSearchType[]>> = ref(response)
const dataq:Ref<UnwrapRef<LocationQueryValue | LocationQueryValue[]>> = ref(route.query.q)
const breadCrumbs:Ref<UnwrapRef<Crumb[]>> = ref([
  {
    title: `Результаты поиска "${route.query.q}"`,
    link: ''
  }
])

useHead({
  title: `Промокоды, скидки и акции для сайтов и интернет-магазинов на ${seo.month} ${seo.year} год поиск по магазинам ${dataq.value}`,
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: `Свежие промокоды, скидки и акции на ${seo.month} ${seo.year} год, а также эксклюзивные купоны. Бегом za халявой!`
    },
    {
      hid: 'keywords',
      name: 'keywords',
      content: 'сайты, промокоды, скидки, акции, магазины, акция, промокод, скидка'
    },
    {
      property: "og:title",
      content: `Промокоды, скидки и акции для сайтов и интернет-магазинов на ${seo.month} ${seo.year} год поиск по магазинам ${dataq.value}`
    },
    {
      property: "og:description",
      content: `Свежие промокоды, скидки и акции на ${seo.month} ${seo.year} год, а также эксклюзивные купоны. Бегом za халявой!`
    },
    {
      property: "og:url",
      content: `https://za-halyavoi.ru${route.fullPath}`
    },
    {
      property: "og:image",
      content: "https://za-halyavoi.ru/logo.png"
    },
    {
      property: "og:type",
      content: "article"
    },
    {
      property: "og:site_name",
      content: "за халявой"
    },
    {
      property: "og:image:url",
      content: "https://za-halyavoi.ru/logo.png"
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://za-halyavoi.ru/search'
    }
  ]
})
</script>
