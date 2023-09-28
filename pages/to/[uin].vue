<template>
  <h1></h1>
</template>

<script setup lang="ts">
import {defineNuxtRouteMiddleware, navigateTo} from "#app/composables/router";
import {PostType} from "~/types/PostType";
import {definePageMeta} from "#imports";
import {useRoute} from "vue-router";
const route = useRoute()

definePageMeta({
  middleware: [
      async function (to, from) {
        const route = useRoute()
        const res = await $fetch<PostType>(`https://za-halyavoi.ru/api/post/${route.params.uin}`)
        return navigateTo(res.url, {external: true})
      }
  ]
})
</script>
