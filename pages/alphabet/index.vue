<template>
  <div class="">
    <h1 class="text-2xl font-bold mb-2">Магазины по алфавиту</h1>
    <h2 class="text-xl font-bold mb-4">
      Найдите интересующий вас магазин по первой букве:
    </h2>

    <div class="flex gap-2 mb-8">
      <nuxt-link
        to="/alphabet"
        class="flex justify-center items-center sm:text-xl text-center mb-3 bg-primary px-3 text-second font-medium text-xl hover:-translate-y-0.5 hover:shadow-md hover:shadow-[#00000070]"
      >
        Все магазины
      </nuxt-link>
      <nuxt-link
        to="/alphabet/0"
        class="flex justify-center items-center sm:text-xl text-center mb-3 bg-primary px-3 text-second font-medium text-xl hover:-translate-y-0.5 hover:shadow-md hover:shadow-[#00000070]"
      >
        Цифры
      </nuxt-link>
      <nuxt-link
        to="/alphabet/symbol"
        class="flex justify-center items-center sm:text-xl text-center mb-3 bg-primary px-3 text-second font-medium text-xl hover:-translate-y-0.5 hover:shadow-md hover:shadow-[#00000070]"
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

    <h3 class="mt-10 text-second dark:text-zinc-200 text-xl mb-1">
      Сайты по цифрам "<span class="font-bold">0-9</span>"
    </h3>

    <div
      v-if="filterByNumber.length"
      class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 mb-3"
    >
      <nuxt-link
        v-for="shop in filterByNumber"
        :key="shop.uin"
        :to="`/shop/${shop.lat_title}`"
        class="w-full pl-1 text-xl font-light py-1 hover:bg-zinc-700 hover:text-primary duration-75 whitespace-nowrap overflow-ellipsis overflow-hidden"
        >{{ shop.title }}
      </nuxt-link>
    </div>
    <div v-else class="font-bold mb-3">Магазины скоро появятся</div>

    <h3 class="text-second dark:text-zinc-200 text-xl mb-1">
      Сайты по символам
    </h3>

    <div
      v-if="filterBySymbol.length"
      class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 mb-3"
    >
      <nuxt-link
        v-for="shop in filterBySymbol"
        :key="shop.uin"
        :to="`/shop/${shop.lat_title}`"
        class="w-full pl-1 text-xl font-light py-1 hover:bg-zinc-700 hover:text-primary duration-75 whitespace-nowrap overflow-ellipsis overflow-hidden"
        >{{ shop.title }}
      </nuxt-link>
    </div>
    <div v-else class="font-bold mb-3">Магазины скоро появятся</div>

    <div v-for="symbol in ruAlphabet" :key="symbol" class="my-10">
      <h3 class="text-second dark:text-zinc-200 text-xl mb-1">
        Сайты на букву "<span class="font-bold uppercase">{{ symbol }}</span
        >"
      </h3>

      <div
        v-if="filterByAlphabet(symbol).length"
        class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 mb-3"
      >
        <nuxt-link
          v-for="shop in filterByAlphabet(symbol)"
          :key="shop.uin"
          :to="`/shop/${shop.lat_title}`"
          class="w-full pl-1 text-xl font-light py-1 hover:bg-zinc-700 hover:text-primary duration-75 whitespace-nowrap overflow-ellipsis overflow-hidden"
          >{{ shop.title }}</nuxt-link
        >
      </div>
      <div v-else class="font-bold">Магазины скоро появятся</div>
    </div>
    <div v-for="symbol in engAlphabet" :key="symbol" class="my-10">
      <h3 class="text-second dark:text-zinc-200 text-xl mb-1">
        Сайты на букву "<span class="font-bold uppercase">{{ symbol }}</span
        >"
      </h3>

      <div
        v-if="filterByAlphabet(symbol).length"
        class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
      >
        <nuxt-link
          v-for="shop in filterByAlphabet(symbol)"
          :key="shop.uin"
          :to="`/shop/${shop.lat_title}`"
          class="w-full pl-1 text-xl font-light py-1 hover:bg-zinc-700 hover:text-primary duration-75 whitespace-nowrap overflow-ellipsis overflow-hidden"
          >{{ shop.title }}</nuxt-link
        >
      </div>
      <div v-else class="font-bold">Магазины скоро появятся</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ShopType } from "~/types/ShopType";
import { ComputedRef, Ref } from "@vue/reactivity";
import { computed, UnwrapRef } from "vue";
import { useSeoStore } from "~/store/seo.store";

const route = useRoute();
const seo = useSeoStore();

const response = await $fetch<ShopType[]>("https://za-halyavoi.ru/api/shop");

const shops: Ref<UnwrapRef<ShopType[]>> = ref(response);

const engAlphabet: string[] = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
const ruAlphabet: string[] = [
  "а",
  "б",
  "в",
  "г",
  "д",
  "е",
  "ё",
  "ж",
  "з",
  "и",
  "й",
  "к",
  "л",
  "м",
  "н",
  "о",
  "п",
  "р",
  "с",
  "т",
  "у",
  "ф",
  "х",
  "ц",
  "ч",
  "ш",
  "щ",
  "э",
  "ю",
  "я",
];

const filterBySymbol: ComputedRef<ShopType[]> = computed(() => {
  const reg = /[^A-Za-z0-9А-Яа-яЁё]+/gi;
  return shops.value.filter((i) => {
    return reg.test(i.title[0]);
  });
});
const filterByNumber: ComputedRef<ShopType[]> = computed(() => {
  const reg = /^[0-9]+/gi;
  return shops.value.filter((i) => {
    return reg.test(i.title);
  });
});
function filterByAlphabet(symbol: string): ShopType[] {
  return shops.value.filter((i) => {
    return i.title[0].toLowerCase() === symbol.toLowerCase();
  });
}

useHead({
  title: `Все магазины по алфавиту. Промокоды, скидки акции на ${seo.month} ${seo.year} год`,
  meta: [
    {
      hid: "description",
      name: "description",
      // @ts-ignore
      content: `Свежие промокоды, скидки и акции на ${seo.month} ${seo.year} год, а также эксклюзивные купоны. Бегом za халявой!`,
    },
    {
      hid: "keywords",
      name: "keywords",
      content:
        "сайты, алфавит, промокоды, скидки, акции, магазины, акция, промокод, скидка",
    },
    {
      property: "og:title",
      // @ts-ignore
      content: `Все магазины по алфавиту. Промокоды, скидки акции на ${seo.month} ${seo.year} год`,
    },
    {
      property: "og:description",
      // @ts-ignore
      content: `Свежие промокоды, скидки и акции на ${seo.month} ${seo.year} год, а также эксклюзивные купоны. Бегом za халявой!`,
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
      href: "https://za-halyavoi.ru/alphabet",
    },
  ],
});
</script>
