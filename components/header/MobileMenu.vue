<template>
  <div
      v-if="popup.openMobileMenu"
      class="flex fixed top-0 left-0 w-full h-full z-50"
  >
    <div class="w-9/12 h-full bg-white dark:bg-zinc-800 overflow-auto z-50 p-3">
      <ul>
        <li>
          <nuxt-link to="/" class="mb-2 block" @click.prevent="clickLink('/')"
          ><fa class="text-primary mr-1" icon="house" /> Главная</nuxt-link
          >
        </li>
        <li>
          <m-collapse animation>
            <template #trigger>
              <div class="mb-2 block">
                <fa class="text-primary mr-1" icon="braille" /> Категории
                <fa icon="chevron-up" class="arrow" />
              </div>
            </template>
            <template #content>
              <div class="">
                <a
                    v-for="category in aside.popularCategories"
                    :key="category.uin"
                    class="ml-4 block my-1"
                    :href="`/categories/${category.lat_title}`"
                    @click.prevent="
                    clickLink(`/categories/${category.lat_title}`)
                  "
                ><fa :icon="category.icon" class="text-second mr-1" />
                  {{ category.title }}</a
                >
                <a
                    href="/categories"
                    class="ml-4 block my-1"
                    @click.prevent="clickLink('/categories')"
                ><fa class="text-second mr-1" icon="ellipsis-h" /> Все
                  категории</a
                >
              </div>
            </template>
          </m-collapse>
        </li>
        <li>
          <a href="/blog" class="mb-2 block">
            <fa icon="newspaper" class="text-primary" />
            Блог
          </a>
        </li>
        <li>
          <a
              href="/alphabet"
              class="mb-2 block"
              @click.prevent="clickLink('/alphabet')"
          ><fa class="text-primary mr-1" icon="arrow-down-a-z" /> Сайты по
            алфавиту</a
          >
        </li>
        <li>
          <m-collapse animation>
            <template #trigger>
              <div class="mb-2 block">
                <fa icon="crown" class="text-primary mr-1" />Популярные
                приложения <fa icon="chevron-up" class="arrow" />
              </div>
            </template>
            <template #content>
              <div class="grid grid-cols-2">
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
                      :src="`https://za-halyavoi.ru/api/static/${shop.shop.image}`"
                      :alt="shop.shop.title"
                  />
                </a>
              </div>
            </template>
          </m-collapse>
        </li>
        <li>
          <button class="" @click="changeColorMode">
<!--            <fa-->
<!--                v-if="$colorMode.preference === 'dark'"-->
<!--                icon="moon"-->
<!--                class="text-primary mr-1"-->
<!--            />-->
<!--            <fa-->
<!--                v-if="$colorMode.preference === 'light'"-->
<!--                icon="sun"-->
<!--                class="text-primary mr-1"-->
<!--            />-->
            цветовая схема
          </button>
        </li>
      </ul>
    </div>

    <div
        class="w-3/12 h-full bg-[#00000090]"
        @click="popup.toggleMenu"
    ></div>
  </div>
</template>

<script setup lang="ts">
import MCollapse from '~/components/_core/MCollapse.vue'
import {usePopupStore} from "~/store/popup.store";
import {useAsideStore} from "~/store/aside.store";

const router = useRouter()
const popup = usePopupStore()
const aside = useAsideStore()

function clickLink(url: string) {
  popup.toggleMenu()
  router.push(url)
}
function changeColorMode() {
  // // @ts-ignore
  // this.$colorMode.preference === 'dark'
  //     ? // @ts-ignore
  //     (this.$colorMode.preference = 'light')
  //     : // @ts-ignore
  //     (this.$colorMode.preference = 'dark')
}
</script>
