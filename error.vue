<template>
  <div
    class="dark:bg-zinc-900 dark:text-zinc-200 h-screen flex justify-center items-center"
  >
    <client-only>
      <div class="container w-full">
        <h1 class="font-bold text-4xl text-center">
          Ошибка {{ error?.statusCode || "404" }}
        </h1>
        <h2 class="font-bold text-3xl text-center">Страница не найдена</h2>
        <h3 class="font-bold text-2xl text-center">
          Вернитесь на
          <nuxt-link
            class="underline hover:no-underline hover:text-primary"
            to="/"
            >Главную страницу</nuxt-link
          >
        </h3>
      </div>
    </client-only>
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
import { Ref, UnwrapRef } from "vue";

definePageMeta({
  layout: "shop",
});
const error: Ref<
  | Error
  | {
      url: string;
      statusCode: number;
      statusMessage: string;
      message: string;
      description: string;
      data?: any;
    }
  | null
  | undefined
> = useError();

console.log(error.value?.statusMessage);

onMounted(async () => {
  await useFetch("https://za-halyavoi.ru/api/error", {
    method: "post",
    body: {
      title: error.value?.message,
      code: error.value?.statusCode,
      date: new Date(),
      url: error.value?.url,
    },
  });
});
</script>
