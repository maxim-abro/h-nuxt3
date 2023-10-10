<template>
  <nav class="mb-4">
    <ol
      itemscope
      itemtype="https://schema.org/BreadcrumbList"
      class="flex items-center flex-wrap"
    >
      <li
        itemprop="itemListElement"
        itemscope
        itemtype="https://schema.org/ListItem"
      >
        <NuxtLink
          itemprop="item"
          class="text-gray-600 dark:text-zinc-200 text-xs md:text-base hover:underline"
          to="/"
        >
          <span itemprop="name">Главная</span>
        </NuxtLink>
      </li>

      <li
        v-for="(crumb, idx) in crumbs"
        :key="idx"
        class="breadcrumb-item"
        :class="{ 'text-primary': isActive(idx) }"
        itemprop="itemListElement"
        itemscope
        itemtype="https://schema.org/ListItem"
      >
        <span class="mx-3 text-second dark:text-zinc-200 text-xs md:text-base">
          /
        </span>
        <NuxtLink
          itemprop="item"
          v-if="crumb.link"
          class="text-gray-600 dark:text-zinc-200 text-xs md:text-base hover:underline"
          :to="crumb.link"
        >
          <span itemprop="name">{{ crumb.title }}</span>
        </NuxtLink>
        <span v-if="!crumb.link" class="text-primary text-xs md:text-base">{{
          crumb.title
        }}</span>
        <meta itemprop="position" :content="String(idx + 2)" />
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { Crumb } from "~/types/components/BreadcrumbsType";

interface BreadcrumbsType {
  crumbs: Crumb[];
}

const props = defineProps<BreadcrumbsType>();

function isActive(index: number): boolean {
  return index === props.crumbs.length - 1;
}
</script>
