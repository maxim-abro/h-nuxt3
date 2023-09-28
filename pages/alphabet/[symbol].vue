<template>
  <div class="">
    <h1 class="text-2xl font-bold mb-2">
      Магазины по алфавиту на {{ titlePage }}
    </h1>
    <h2 class="text-xl font-bold mb-4">
      Найдите интересующий вас магазин по первой букве:
    </h2>

    <div class="flex gap-2 mb-8">
      <nuxt-link
          to="/alphabet"
          class="flex justify-center items-center text-base sm:text-xl text-center mb-3 bg-primary px-3 text-second font-medium hover:-translate-y-0.5 hover:shadow-md hover:shadow-[#00000070]"
      >
        Все магазины
      </nuxt-link>
      <nuxt-link
          to="/alphabet/0"
          class="flex justify-center items-center text-base sm:text-xl text-center mb-3 bg-primary px-3 text-second font-medium hover:-translate-y-0.5 hover:shadow-md hover:shadow-[#00000070]"
      >
        Цифры
      </nuxt-link>
      <nuxt-link
          to="/alphabet/symbol"
          class="flex justify-center items-center text-base sm:text-xl text-center mb-3 bg-primary px-3 text-second font-medium hover:-translate-y-0.5 hover:shadow-md hover:shadow-[#00000070]"
      >
        Символы
      </nuxt-link>
    </div>

    <div class="flex flex-wrap gap-1 sm:gap-2 mb-8">
      <nuxt-link
          v-for="i in engAlphabet"
          :key="i"
          :to="`/alphabet/${i}`"
          class="block text-center bg-primary w-8 sm:w-10 text-second font-medium text-base py-1 sm:text-xl hover:-translate-y-0.5 hover:shadow-md hover:shadow-[#00000070]"
      >
        {{ i }}
      </nuxt-link>
    </div>

    <div class="flex flex-wrap gap-1 sm:gap-2 mb-8">
      <nuxt-link
          v-for="i in ruAlphabet"
          :key="i"
          :to="`/alphabet/${i}`"
          class="block text-center bg-primary w-8 sm:w-10 text-second font-medium text-base py-1 sm:text-xl hover:-translate-y-0.5 hover:shadow-md hover:shadow-[#00000070]"
      >
        {{ i }}
      </nuxt-link>
    </div>

    <h3 class="text-second dark:text-zinc-200 text-xl mb-1">
      Сайты и магазины на "<span class="font-bold uppercase">{{
        titlePage
      }}</span
    >"
    </h3>

    <div
        v-if="shops.length"
        class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 mb-3"
    >
      <nuxt-link
          v-for="shop in shops"
          :key="shop.uin"
          :to="`/shop/${shop.lat_title}`"
          class="w-full pl-1 text-xl font-light py-1 hover:bg-zinc-700 hover:text-primary duration-75 whitespace-nowrap overflow-ellipsis overflow-hidden"
      >{{ shop.title }}</nuxt-link
      >
    </div>
    <div v-else class="font-bold">Магазины скоро появятся</div>
  </div>
</template>

<script setup lang="ts">
import {useSeoStore} from "~/store/seo.store";
import {ShopType} from "~/types/ShopType";
import {ComputedRef, Ref} from "@vue/reactivity";
import {computed, UnwrapRef} from "vue";

const route = useRoute()
const seo = useSeoStore()
const response = await $fetch<ShopType[]>(encodeURI(`https://za-halyavoi.ru/api/shop/symbol/${String(route.params.symbol).toLowerCase()}`))
const shops:Ref<UnwrapRef<ShopType[]>> = ref(response)

const engAlphabet:string[] = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
]
const ruAlphabet:string[] = [
  'а',
  'б',
  'в',
  'г',
  'д',
  'е',
  'ё',
  'ж',
  'з',
  'и',
  'й',
  'к',
  'л',
  'м',
  'н',
  'о',
  'п',
  'р',
  'с',
  'т',
  'у',
  'ф',
  'х',
  'ц',
  'ч',
  'ш',
  'щ',
  'э',
  'ю',
  'я',
]

const titlePage:ComputedRef<string|string[]> = computed(() => {
  if (route.params.symbol === 'symbol') {
    return 'символ'
  } else if (route.params.symbol === '0') {
    return 'цифру'
  } else {
    return route.params.symbol
  }
})

useHead({
  title: `Все магазины на ${titlePage.value}. Промокоды, скидки акции на ${seo.month} ${seo.year} год`,
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: `Все магазины на ${String(route.params.symbol).toLowerCase()}. Свежие промокоды, скидки и акции на ${
          seo.month
      } ${
          seo.year
      } год, а также эксклюзивные купоны. Бегом za халявой!`,
    },
    {
      hid: 'keywords',
      name: 'keywords',
      content:
          'сайты, алфавит, промокоды, скидки, акции, магазины, акция, промокод, скидка',
    },
    {
      property: 'og:title',
      content: `Все магазины на ${String(route.params.symbol).toLowerCase()}. Промокоды, скидки акции на ${
          seo.month
      } ${seo.year} год`,
    },
    {
      property: 'og:description',
      content: `Все магазины на ${String(route.params.symbol).toLowerCase()}. Свежие промокоды, скидки и акции на ${
          seo.month
      } ${
          seo.year
      } год, а также эксклюзивные купоны. Бегом za халявой!`,
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
      href: 'https://za-halyavoi.ru/alphabet/' + route.params.symbol,
    },
  ],
})
</script>
