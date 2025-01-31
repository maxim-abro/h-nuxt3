<template>
  <div
    class="shadow-[#00000070] rounded flex flex-col sm:flex-row px-8 shadow-md justify-between w-full py-4 border-2 dark:border-zinc-700 mb-10"
    :class="post.recomended ? 'shadow-primary' : ''"
  >
    <div
      class="flex items-center mx-auto sm:mx-0 flex-col w-full sm:w-2/3 sm:flex-row"
    >
      <div class="w-full mb-3 sm:mb-0 sm:w-1/3">
        <img
          :title="post.shop.title"
          loading="lazy"
          :src="post.shop.image"
          alt="логотип магазина"
          class="mx-auto w-2/3 sm:w-full cursor-pointer"
          @click="openLink"
        />
        <div
          class="mx-auto text-xl w-max px-3 bg-zinc-100 dark:bg-zinc-800 mt-3 dark:text-zinc-200"
        >
          <button class="group p-0.5" @click="emit('like', post.uin)">
            <nuxt-icon
              class="group-hover:text-primary transition-all duration-300 hover:transition-all hover:duration-300"
              name="heart"
            />
          </button>

          {{ post.rating || 0 }}
        </div>
      </div>

      <div class="w-full mb-4 sm:mb-0 sm:w-2/3">
        <h2
          class="mx-auto mt-1 text-center text-xl h-[112px] overflow-hidden font-medium dark:hover:text-primary hover:text-primary dark:text-zinc-200 cursor-pointer"
          @click="openLink"
        >
          {{ post.title }}
        </h2>
        <nuxt-link
          v-if="props.showShop"
          class="text-sm block mb-3 text-zinc-400 hover:text-primary transition-all duration-300 hover:transition-all hover:duration-300"
          :to="`/shop/${post.shop.lat_title}`"
        >
          <nuxt-icon name="check" class="text-primary" />
          {{ post.shop.title }}</nuxt-link
        >
        <button
          class="text-zinc-400 mx-auto hover:text-primary transition-all duration-300 hover:transition-all hover:duration-300"
        >
          <nuxt-icon name="share-nodes" class="text-primary text-base" />
          Поделиться
        </button>
      </div>
    </div>

    <div class="flex flex-col w-full sm:w-1/3 justify-center items-center">
      <m-button
        rel="nofollow"
        target="_blank"
        class="w-max mb-3 sm:mb-0 sm:self-end"
        @click="openLink"
      >
        {{ post.type === "promoCode" ? "Показать код" : "открыть купон" }}
      </m-button>

      <div
        v-if="post.endDate"
        class="text-sm self-end text-zinc-400 dark:text-zinc-200"
      >
        Действителен до:
        {{
          new Date(post.endDate).toLocaleDateString("ru-RU", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })
        }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MButton from "~/components/_core/MButton.vue";
import { PostType } from "~/types/PostType";

const props = defineProps<{ post: PostType; showShop?: boolean }>();

const emit = defineEmits(["like"]);

function openLink() {
  window.open(`https://za-halyavoi.ru/?coupon=${props.post.uin}`);
  window.location.href = props.post.url;
}
</script>
