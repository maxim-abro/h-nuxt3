<template>
  <div
    class="shadow-md shadow-[#00000070] w-full border-zinc-200 p-3 dark:text-zinc-200 bg-white dark:bg-zinc-900"
  >
    <img
      v-if="data.image"
      :title="data.title"
      loading="lazy"
      :src="`https://za-halyavoi.ru/api/static/${data.image}`"
      :alt="data.title"
      class="mx-auto w-max-[100%] mb-3"
    />
    <a
      :href="data.url"
      target="_blank"
      class="w-full rounded border bg-white inline-block text-lg text-center dark:bg-zinc-800 dark:hover:bg-primary border-primary text-primary py-1.5 hover:bg-primary hover:text-white transition-all duration-300 hover:transition-all hover:duration-300"
    >
      <nuxt-icon name="up-right-from-square" />
      Перейти на сайт
    </a>

    <button
      class="text-center rounded w-full mt-3 py-1.5 bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 text-second dark:hover:text-primary hover:text-primary transition-all duration-300 hover:transition-all hover:duration-300"
      @click="$router.push(`/shop/add/${data.lat_title}`)"
    >
      <nuxt-icon name="circle-chevron-down" />
      Предложить купон
    </button>

    <hr class="border-zinc-200 my-5 -mx-3" />
    <div class="">
      {{ data.description }}
    </div>

    <hr class="border-zinc-200 my-5 -mx-3" />

    <button
      class="text-sm hover:text-primary duration-300 hover:transition-all hover:duration-300"
      @click="openInfo = !openInfo"
    >
      <nuxt-icon name="circle-info" class="text-primary" />
      Информация о магазине "{{ data.title }}"
    </button>

    <div v-if="openInfo" class="mt-3">
      <div class="mb-1.5">
        <b>Контакты {{ data.title }}: </b>
        {{ data.contacts }}
      </div>

      <div v-if="data.dostavka" class="mb-1.5">
        <b>{{ data.title }} доставка: </b>
        {{ data.dostavka }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref, UnwrapRef } from "vue";
import { ShopType } from "~/types/ShopType";

defineProps<{ data: ShopType }>();

const openInfo = ref<boolean>(false);
</script>
