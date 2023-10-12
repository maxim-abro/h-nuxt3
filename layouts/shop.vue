<template>
  <div class="dark:bg-zinc-900 pt-14 md:pt-0">
    <m-header :holiday="header.holiday" />
    <slot />
    <m-footer />
    <noscript>
      <iframe
        src="https://www.googletagmanager.com/ns.html?id=GTM-MWZ6V8X"
        height="0"
        width="0"
        style="display: none; visibility: hidden"
      >
      </iframe>
    </noscript>
  </div>
</template>

<script setup lang="ts">
import MHeader from "~/components/header/MHeader.vue";
import MFooter from "~/components/MFooter.vue";
import { useHeaderStore } from "~/store/header.store";

const header = useHeaderStore();
</script>
