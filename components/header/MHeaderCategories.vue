<template>
  <transition
    enter-active-class="transition-all duration-300 ease-in"
    leave-active-class="transition-all duration-300 ease-out"
    enter-class="opacity-0 -translate-y-full"
    enter-to-class="opacity-100 translate-y-0"
    leave-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 -translate-y-full"
  >
    <div
      v-if="popupStore.openCats"
      v-click-outside="popupStore.toggleCats"
      class="bg-zinc-50 dark:bg-zinc-900 shadow-xl p-8 text-second dark:text-white absolute top-full left-1/2 -translate-x-1/2 z-50"
    >
      <div class="grid grid-cols-3">
        <nuxt-link
          v-for="cat in getCategories"
          :key="cat.uin"
          class="w-full pl-1 text-xl font-light py-1 hover:bg-zinc-700 hover:text-primary duration-75 whitespace-nowrap overflow-ellipsis overflow-hidden"
          :to="`/categories/${cat.lat_title}`"
          @click.prevent="clickCat(`/categories/${cat.lat_title}`)"
          ><nuxt-icon :name="`category/${cat.icon}`" class="mr-3 w-4" />{{
            cat.title
          }}</nuxt-link
        >
        <nuxt-link
          class="w-full pl-1 text-xl font-light py-1 hover:bg-zinc-700 hover:text-primary duration-75 whitespace-nowrap overflow-ellipsis overflow-hidden"
          to="/categories"
          @click.prevent="clickCat('/categories')"
          ><nuxt-icon name="ellipsis" /> Все категории</nuxt-link
        >
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ComputedRef, Ref, computed, UnwrapRef } from "vue";
import { RouteLocationRaw, useRouter } from "vue-router";
import { usePopupStore } from "~/store/popup.store";
import { CategoryType } from "~/types/CategoryType";

const router = useRouter();
const popupStore = usePopupStore();

const categories = ref<CategoryType[]>([]);

onMounted(async () => {
  categories.value = await $fetch<CategoryType[]>(
    "https://za-halyavoi.ru/api/category",
  );
});

const getCategories = computed<CategoryType[]>(() =>
  categories.value.slice(0, 11),
);

function clickCat(url: RouteLocationRaw): void {
  popupStore.toggleCats();
  router.push(url);
}
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active до версии 2.1.8 */ {
  transform: translateY(10px);
  opacity: 0;
}
</style>
