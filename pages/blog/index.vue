<template>
  <div class="">
    <m-bread-crumbs :crumbs="breadCrumbs" />
    <h1 class="text-2xl lg:text-3xl font-bold mb-8">Блог</h1>

    <div class="grid gird-cols-1 xl:grid-cols-2 sm:gap-8 gap-4">
      <div
          v-for="blog of blogs"
          :key="blog.id"
          class="rounded shadow shadow-md shadow-[#00000070]"
      >
        <nuxt-link :to="`/blog/${blog.lat_title}`"
        ><img
            class="mb-4 rounded-t cursor-pointer"
            :src="`https://za-halyavoi.ru/api/static${blog.preview}`"
            alt=""
        /></nuxt-link>
        <div class="p-2">
          <h2 class="font-bold text-xl mb-4">
            <nuxt-link
                :to="`/blog/${blog.lat_title}`"
                class="hover:text-primary"
            >{{ blog.title }}</nuxt-link
            >
          </h2>
          <p>{{ blog.description }}</p>

          <div class="flex justify-between items-center mt-4">
            <nuxt-link :to="`/blog/${blog.lat_title}`">
              <m-button>Читать далее</m-button>
            </nuxt-link>
            <div class="">
              {{
                new Date(blog.date).toLocaleDateString('ru-RU', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })
              }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MBreadCrumbs from '~/components/MBreadCrumbs.vue'
import MButton from '~/components/_core/MButton.vue'
import {BlogType} from "~/types/BlogType";
import {Ref} from "@vue/reactivity";
import {UnwrapRef} from "vue";
import {Crumb} from "~/types/components/BreadcrumbsType"
import {useSeoStore} from "~/store/seo.store"

const route = useRoute()
const seo = useSeoStore()

const response = await $fetch<BlogType>('https://za-halyavoi.ru/api/blog/all')
const blogs: Ref<UnwrapRef<BlogType>> = ref(response)

const breadCrumbs:Ref<UnwrapRef<Crumb[]>> = ref([
  {
    title: 'Блог',
    link: ''
  }
])

useHead({
  title: `Блог про шоппинг, промокоды, акции, купоны на ${seo.month} ${seo.year} год.`,
  meta: [
    {
      hid: 'description',
      name: 'description',
      // @ts-ignore
      content: `Блог про шоппинг, промокоды, акции, купоны - Свежие промокоды, скидки и акции на ${seo.month} ${seo.year} год, а также эксклюзивные купоны. Бегом za халявой!`,
    },
    {
      hid: 'keywords',
      name: 'keywords',
      content:
          'блог, новости, промокоды, скидки, акции, магазины, акция, промокод, скидка',
    },
    {
      property: 'og:title',
      // @ts-ignore
      content: `Блог про шоппинг, промокоды, акции, купоны на ${seo.month} ${seo.year} год.`,
    },
    {
      property: 'og:description',
      // @ts-ignore
      content: `Блог про шоппинг, промокоды, акции, купоны - Свежие промокоды, скидки и акции на ${seo.month} ${seo.year} год, а также эксклюзивные купоны. Бегом za халявой!`,
    },
    {
      property: 'og:url',
      // @ts-ignore
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
      // @ts-ignore
      href: 'https://za-halyavoi.ru/blog',
    },
  ],
})
</script>
