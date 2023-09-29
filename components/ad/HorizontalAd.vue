<template>
  <nuxt-link
    :to="url"
    class="w-full rounded block mb-2 sm:mb-5 shadow-md shadow-[#00000070]"
  >
    <img loading="lazy" :src="img" alt="ad_top" class="w-full rounded" />
  </nuxt-link>
</template>

<script setup lang="ts">
import { HorizontalAdType } from "~/types/components/HorizontalAdType";

defineProps<HorizontalAdType>();
</script>
