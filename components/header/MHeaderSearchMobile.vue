<template>
  <form
    class="absolute p-3 left-0 w-full bg-second z-30 slide-down"
    @submit.prevent="submitSearch"
  >
    <div class="relative">
      <m-input
        v-model="searchQuery"
        class="p-2 w-full"
        placeholder="поиск товара или сайт"
        type="search"
      />

      <m-header-search v-if="searchShops.length" :shops="searchShops" />
    </div>
  </form>
</template>

<script setup lang="ts">
import _ from "lodash";
import MInput from "~/components/_core/MInput.vue";
import MHeaderSearch from "~/components/header/MHeaderSearch.vue";
import { ShopsSearchType } from "~/types/components/HeaderSearchType";

const router = useRouter();

const emit = defineEmits(["close"]);

const searchQuery = ref<string>("");
const searchShops = ref<ShopsSearchType[]>([]);

function submitSearch() {
  router.push(`/search?q=${searchQuery.value}`);
  searchShops.value = [];
  searchQuery.value = "";
  emit("close");
}

watch(
  () => searchQuery.value,
  _.debounce(async function () {
    if (searchQuery.value.length > 2) {
      searchShops.value = await $fetch<ShopsSearchType[]>(
        `https://za-halyavoi.ru/api/search?q=${encodeURI(
          searchQuery.value.toLowerCase(),
        )}`,
      );
    }
  }, 1000),
);
</script>
