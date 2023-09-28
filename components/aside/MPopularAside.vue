<template>
  <div
      class="rounded shadow-md shadow-[#00000070] border dark:border-zinc-700"
  >
    <div
        class="p-4 text-second font-bold text-center bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-200"
    >
      <nuxt-icon name="crown" class="text-primary mr-2" />
      Популярные предложения
    </div>

    <div class="grid grid-cols-2 gap-2 p-4">
      <nuxt-link
          v-for="i in popular"
          :key="i.shop.uin"
          :to="`/shop/${i.shop.lat_title}`"
          class="cursor-pointer hover:shadow-lg hover:-translate-y-1 flex items-center"
      >
        <img
            :title="i.shop.title"
            loading="lazy"
            :src="`https://za-halyavoi.ru/api/static/${i.shop.image}`"
            :alt="i.shop.title"
            class="w-full"
        />
      </nuxt-link>
    </div>

    <nuxt-link
        to="/alphabet"
        class="text-center bg-zinc-100 dark:bg-zinc-700 text-second dark:text-zinc-200 font-bold block w-full p-4 hover:text-primary dark:hover:text-primary"
    >Все предложения</nuxt-link>
  </div>
</template>

<script setup lang="ts">
import {PopularSitesType} from "~/types/PopularSitesType";

interface PopularAsideType {
  popular: PopularSitesType[]
}

defineProps<PopularAsideType>()
</script>
