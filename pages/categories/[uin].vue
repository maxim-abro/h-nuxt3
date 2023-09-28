<template>
  <div class="">
    <m-bread-crumbs :crumbs="breadCrumbs" />
    <h1 class="text-2xl lg:text-3xl font-bold mb-4">
      <nuxt-icon :name="`category/${category.icon}`" class="text-primary mr-3" />Промокоды на скидку
      в категории {{ category.title.toLowerCase() }}
    </h1>
    <h2 class="text-gray-900 dark:text-zinc-200 mb-3">
      {{ category.description }}
    </h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-1">
      <nuxt-link
          v-for="shop in shops"
          :key="shop.uin"
          :to="`/shop/${shop.lat_title}`"
          class="w-full pl-1 text-xl font-light py-1 hover:bg-zinc-700 hover:text-primary duration-75 whitespace-nowrap overflow-ellipsis overflow-hidden"
      >
        {{ shop.title }}
      </nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import MBreadCrumbs from '~/components/MBreadCrumbs.vue'
import {useSeoStore} from "~/store/seo.store";
import {CategoryType} from "~/types/CategoryType";
import {ShopType} from "~/types/ShopType";
import {Ref} from "@vue/reactivity";
import {UnwrapRef} from "vue";
import {Crumb} from "~/types/components/BreadcrumbsType";

const route = useRoute()
const seo = useSeoStore()

const responseCategory = await $fetch<CategoryType>(`https://za-halyavoi.ru/api/category/by/${route.params.uin}`)
const responseShops = await $fetch<ShopType[]>(`https://za-halyavoi.ru/api/shop/category/${responseCategory.uin}`)

const category:Ref<UnwrapRef<CategoryType>> = ref(responseCategory)
const shops:Ref<UnwrapRef<ShopType[]>> = ref(responseShops)

const breadCrumbs:Ref<UnwrapRef<Crumb[]>> = ref([
  { link: '/categories', title: 'Категории сайтов' },
  { link: '', title: category.value.title },
])

useHead({
  title: `${category.value.title} по скидкам с купонами и промокодами на ${seo.month} ${seo.year} год`,
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: category.value.description.slice(0, 346) + '...',
    },
    {
      hid: 'keywords',
      name: 'keywords',
      content: `сайты, категории, промокоды, скидки, акции, магазины, акция, промокод, скидка, ${category.value.title}, ${seo.month}`,
    },
    {
      property: 'og:title',
      content: `${category.value.title} по скидкам с купонами и промокодами на ${seo.month} ${seo.year} год`,
    },
    {
      property: 'og:description',
      content: category.value.description,
    },
    {
      property: 'og:url',
      content: `https://za-halyavoi.ru${route.fullPath}`,
    },
    {
      property: 'og:image',
      content: 'https://za-halyavoi.ru/logo.png',
    },
    {
      property: 'og:type',
      content: 'article',
    },
    {
      property: 'og:site_name',
      name: 'og:site_name',
      content: 'за халявой',
    },
    {
      property: 'og:image:url',
      content: 'https://za-halyavoi.ru/logo.png',
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://za-halyavoi.ru/categories/' + route.params.uin,
    },
  ],
})
</script>
