<template>
  <nuxt-link
      :to="url"
      class="w-full block mb-2 sm:mb-5 rounded shadow-md shadow-[#00000070]"
  >
    <img loading="lazy" :src="img" alt="ad_aside" class="w-full rounded" />
  </nuxt-link>
</template>

<script setup lang="ts">
import {AsideAdType} from "~/types/components/AsideAdType";

defineProps<AsideAdType>()
</script>
