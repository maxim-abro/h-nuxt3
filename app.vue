<template>
  <div>
        <VitePwaManifest />
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="js">
import { useAsideStore } from "~/store/aside.store";
import { useHeaderStore } from "~/store/header.store";
import { useSeoStore } from "~/store/seo.store";

const asideStore = useAsideStore();
const headerStore = useHeaderStore();
const seoStore = useSeoStore();

seoStore.setState();
await asideStore.getBuild();
await headerStore.getRandomHoliday();
</script>
