<template>
  <h1></h1>
</template>

<script setup lang="ts">
import { navigateTo } from "#app/composables/router";
import { useRoute } from "vue-router";
import { PostType } from "~/types/PostType";
import { definePageMeta } from "#imports";

definePageMeta({
  middleware: [
    async function () {
      const route = useRoute();
      const res = await $fetch<PostType>(
        `https://za-halyavoi.ru/api/post/${route.params.uin}`,
      );
      return navigateTo(res.url, { external: true });
    },
  ],
});
</script>
