<template>
  <nav class="mb-4">
    <ol class="flex items-center flex-wrap">
      <li>
        <NuxtLink
            class="text-gray-600 dark:text-zinc-200 text-xs md:text-base hover:underline"
            to="/"
        >Главная</NuxtLink
        >
      </li>

      <li
          v-for="(crumb, idx) in crumbs"
          :key="idx"
          class="breadcrumb-item"
          :class="{ 'text-primary': isActive(idx) }"
      >
        <span class="mx-3 text-second dark:text-zinc-200 text-xs md:text-base">
          /
        </span>
        <NuxtLink
            v-if="crumb.link"
            class="text-gray-600 dark:text-zinc-200 text-xs md:text-base hover:underline"
            :to="crumb.link"
        >{{ crumb.title }}</NuxtLink
        >
        <span v-if="!crumb.link" class="text-primary text-xs md:text-base">{{
            crumb.title
          }}</span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">

import {BreadcrumbsType} from "~/types/components/BreadcrumbsType";

const props = defineProps<BreadcrumbsType>()

function isActive(index:number):boolean {
  return index === props.crumbs.length - 1
}
</script>
