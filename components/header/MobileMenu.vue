<template>
  <div
    v-if="popup.openMobileMenu"
    class="fixed top-0 left-0 w-full h-full z-50"
  >
    <div class="relative flex h-full">
      <div
        class="w-9/12 h-full bg-white dark:bg-zinc-800 overflow-auto z-50 p-3 slide-right"
      >
        <ul>
          <li>
            <nuxt-link to="/" class="mb-2 block" @click.prevent="clickLink('/')"
              ><nuxt-icon class="text-primary mr-1" name="header/home" />
              Главная</nuxt-link
            >
          </li>
          <li>
            <div
              class="mb-2 block"
              @click="isOpenCategories = !isOpenCategories"
            >
              <nuxt-icon class="text-primary mr-1" name="header/braille" />
              Категории
              <nuxt-icon v-show="isOpenCategories" name="chevron-up" />
              <nuxt-icon v-show="!isOpenCategories" name="chevron-down" />
            </div>
            <div v-if="isOpenCategories" class="">
              <a
                v-for="category in aside.popularCategories"
                :key="category.uin"
                class="ml-4 block my-1"
                :href="`/categories/${category.lat_title}`"
                @click.prevent="clickLink(`/categories/${category.lat_title}`)"
                ><nuxt-icon
                  :name="`category/${category.icon}`"
                  class="text-second dark:text-primary mr-1"
                />
                {{ category.title }}</a
              >
              <a
                href="/categories"
                class="ml-4 block my-1"
                @click.prevent="clickLink('/categories')"
                ><nuxt-icon class="text-second mr-1" name="header/ellipsis" />
                Все категории</a
              >
            </div>
          </li>
          <li>
            <a href="/blog" class="mb-2 block">
              <nuxt-icon name="header/newspaper" class="text-primary" />
              Блог
            </a>
          </li>
          <li>
            <a
              href="/alphabet"
              class="mb-2 block"
              @click.prevent="clickLink('/alphabet')"
              ><nuxt-icon
                class="text-primary mr-1"
                name="header/arrow-down-a-z"
              />
              Сайты по алфавиту</a
            >
          </li>
          <li>
            <div class="mb-2 block" @click="isOpenPopular = !isOpenPopular">
              <nuxt-icon name="crown" class="text-primary mr-1" />Популярные
              приложения
              <nuxt-icon v-show="isOpenPopular" name="chevron-up" />
              <nuxt-icon v-show="!isOpenPopular" name="chevron-down" />
            </div>
            <div v-show="isOpenPopular" class="grid grid-cols-2">
              <a
                v-for="shop of aside.popular"
                :key="shop.shop.uin"
                :href="`/shop/${shop.shop.uin}`"
                class="block"
                @click.prevent="clickLink(`/shop/${shop.shop.uin}`)"
              >
                <img
                  :title="shop.shop.title"
                  loading="lazy"
                  :src="shop.shop.image"
                  :alt="shop.shop.title"
                />
              </a>
            </div>
          </li>
          <li>
            <button class="" @click="changeColorMode">
              <nuxt-icon
                v-show="colorMode.preference === 'dark'"
                name="moon"
                class="text-primary mr-1"
              />
              <nuxt-icon
                v-show="colorMode.preference === 'light'"
                name="sun"
                class="text-primary mr-1"
              />
              цветовая схема
            </button>
          </li>
        </ul>
      </div>

      <div
        class="w-full absolute left-0 top-0 h-full bg-[#00000090] backdrop-blur"
        @click="popup.toggleMenu"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePopupStore } from "~/store/popup.store";
import { useAsideStore } from "~/store/aside.store";
import { useColorMode } from "#imports";

const router = useRouter();
const popup = usePopupStore();
const aside = useAsideStore();

const colorMode = useColorMode();

const isOpenCategories = ref<boolean>(false);
const isOpenPopular = ref<boolean>(false);

function clickLink(url: string) {
  popup.toggleMenu();
  router.push(url);
}
function changeColorMode(): void {
  colorMode.preference === "dark"
    ? (colorMode.preference = "light")
    : (colorMode.preference = "dark");
}
</script>
