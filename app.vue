<template>
  <div>
    <VitePwaManifest />
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useAsideStore } from "~/store/aside.store";
import { useHeaderStore } from "~/store/header.store";

const asideStore = useAsideStore();
const headerStore = useHeaderStore();

await asideStore.getBuild();
await headerStore.getRandomHoliday();
</script>
