<template>
  <div class="relative dark:bg-zinc-900 z-40">
    <header
      class="mb-3 pt-2 md:py-2 shadow-xl bg-white/25 md:bg-white dark:bg-zinc-900/75 backdrop-blur md:backdrop-blur-0 fixed md:static top-0 left-0 w-full md:shadow-none md:dark:bg-zinc-900 header"
    >
      <div class="container flex justify-between items-center">
        <button
          class="text-primary bg-zinc-100 dark:bg-zinc-800 w-10 h-10 block md:hidden"
          @click="popup.toggleMenu"
        >
          <nuxt-icon name="header/bars" />
        </button>
        <nuxt-link
          to="/"
          class="text-2xl font-black flex items-center text-primary drop-shadow"
        >
          <img
            title="за халявой"
            loading="lazy"
            src="/logo-min.png"
            class="h-16 mr-1 xs:h-20 w-auto"
            alt="логотип"
          />
        </nuxt-link>
        <button
          class="text-primary bg-zinc-100 dark:bg-zinc-800 w-10 h-10 block md:hidden"
          @click="openSearchMobile = !openSearchMobile"
        >
          <nuxt-icon name="header/magnifying-glass" />
        </button>
        <div class="w-5/12 hidden md:flex items-center justify-end">
          <form class="relative w-9/12" @submit.prevent="submitSearch">
            <m-input
              v-model="searchQuery"
              type="search"
              placeholder="поиск товара или сайт"
              class="h-full w-full"
              @blur="blurInput"
            />
            <m-button
              type="submit"
              class="absolute right-0 top-0 h-full px-3 bg-primary hover:bg-yellow-500 transition-all duration-300 hover:transition-all hover:duration-300"
            >
              <nuxt-icon name="header/magnifying-glass" />
            </m-button>
            <m-header-search v-if="searchShops.length" :shops="searchShops" />
          </form>
          <button
            class="h-8 ml-4 w-8 rounded sm:block bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 block dark:hover:bg-zinc-700"
            @click="changeColorMode"
          >
            <nuxt-icon
              v-show="colorMode.preference === 'dark'"
              name="moon"
              class="text-primary"
            />
            <nuxt-icon
              v-show="colorMode.preference === 'light'"
              name="sun"
              class="text-primary"
            />
          </button>
        </div>
      </div>
      <m-header-search-mobile
        v-if="openSearchMobile"
        @close="openSearchMobile = false"
      />

      <!--      <nuxt-link class="p-3 inline-block md:hidden bg-second text-white w-full sign-wrap-3" to="/tags/23-fevralya">-->
      <!--        <span>23 февраля</span>-->
      <!--      </nuxt-link>-->
    </header>

    <nav
      class="bg-second relative dark:bg-zinc-800 text-primary hidden md:block head-nav w-full"
    >
      <div class="container">
        <ul class="flex justify-center items-center">
          <li>
            <nuxt-link
              class="p-3 inline-block hover:bg-zinc-700 dark:hover:bg-zinc-700"
              to="/"
            >
              <nuxt-icon name="header/home" />
              Главная
            </nuxt-link>
          </li>
          <li>
            <button
              class="p-3 inline-block hover:bg-zinc-700 dark:hover:bg-zinc-700"
              href="#"
              @click="popup.toggleCats"
            >
              <nuxt-icon name="header/braille" />
              Категории
            </button>
          </li>
          <li>
            <nuxt-link
              class="p-3 inline-block hover:bg-zinc-700 dark:hover:bg-zinc-700"
              to="/alphabet"
            >
              <nuxt-icon name="header/arrow-down-a-z" />
              Сайты по алфавиту
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              class="p-3 inline-block hover:bg-zinc-700 dark:hover:bg-zinc-700"
              to="/blog"
            >
              <nuxt-icon name="header/newspaper" />
              Блог
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              class="p-3 inline-block text-white hover:bg-zinc-700 dark:hover:bg-zinc-700"
              :to="`/tags/${holiday.lat_title}`"
            >
              <span>{{ holiday.title }}</span>
            </nuxt-link>
          </li>
        </ul>
      </div>
      <m-header-categories />
    </nav>

    <mobile-menu />
  </div>
</template>

<script setup lang="ts">
import { Ref, UnwrapRef } from "vue";
import _ from "lodash";
import MInput from "~/components/_core/MInput.vue";
import MHeaderSearch from "~/components/header/MHeaderSearch.vue";
import MHeaderSearchMobile from "~/components/header/MHeaderSearchMobile.vue";
import MButton from "~/components/_core/MButton.vue";
import MHeaderCategories from "~/components/header/MHeaderCategories.vue";
import MobileMenu from "~/components/header/MobileMenu.vue";
import { HolidayType } from "~/types/HolidayType";
import { ShopsSearchType } from "~/types/components/HeaderSearchType";
import { usePopupStore } from "~/store/popup.store";

const colorMode = useColorMode();

defineProps<{ holiday: HolidayType }>();

const router = useRouter();
const popup = usePopupStore();

const searchQuery: Ref<UnwrapRef<string>> = ref("");
const searchShops: Ref<UnwrapRef<ShopsSearchType[]>> = ref([]);
const openSearchMobile: Ref<UnwrapRef<boolean>> = ref(false);

function blurInput(): void {
  setTimeout(() => {
    searchShops.value = [];
  }, 500);
}

function submitSearch(): void {
  router.push(`/search?q=${searchQuery.value}`);
  searchShops.value = [];
  searchQuery.value = "";
}

function changeColorMode(): void {
  colorMode.preference === "dark"
    ? (colorMode.preference = "light")
    : (colorMode.preference = "dark");
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

onMounted(() => {
  window.addEventListener("scroll", () => {
    const scrollTop: number = window.pageYOffset;
    const header: HTMLHeadingElement | null = document.querySelector(".header");
    const headerNav: HTMLDivElement | null =
      document.querySelector(".head-nav");
    if (header && headerNav) {
      scrollTop >= header.offsetHeight + headerNav.offsetHeight + 30
        ? headerNav.classList.add("is-sticky")
        : headerNav.classList.remove("is-sticky");
      scrollTop >= header.offsetHeight + headerNav.offsetHeight + 30
        ? headerNav.classList.add("backdrop-blur")
        : headerNav.classList.remove("backdrop-blur");
      scrollTop >= header.offsetHeight + headerNav.offsetHeight + 30
        ? headerNav.classList.add("bg-second/[80%]")
        : headerNav.classList.remove("bg-second/[80%]");
      scrollTop >= header.offsetHeight + headerNav.offsetHeight + 30
        ? headerNav.classList.add("dark:bg-zinc-800/50")
        : headerNav.classList.remove("dark:bg-zinc-800/10");
    }
  });
});
</script>
