<template>
  <div class="dark:text-zinc-200">
    <m-bread-crumbs :crumbs="breadCrumbs" />
    <h1 class="text-2xl font-bold mb-8">Контакты</h1>

    <div class="text-second dark:text-zinc-200 mb-4">
      Если у вас возникли вопросы или есть предложения и пожелания по сайту, то
      напишите нам и мы вам обязательно ответим.
    </div>

    <form @submit.prevent="fetchForm">
      <div class="flex gap-8 mb-4">
        <div class="w-1/2">
          <label
            for="name"
            class="text-second dark:text-zinc-200 font-medium mb-2"
            >Имя</label
          >
          <m-input
            v-model="formData.name"
            placeholder="Введите имя"
            class="w-full"
            name="name"
          />
        </div>
        <div class="w-1/2">
          <label
            for="email"
            class="text-second dark:text-zinc-200 font-medium mb-2"
            >Электронная почта</label
          >
          <m-input
            v-model="formData.email"
            placeholder="Введите вашу почту"
            class="w-full"
            name="email"
            type="email"
          />
        </div>
      </div>

      <div class="mb-4 relative">
        <label
          for="message"
          class="text-second dark:text-zinc-200 font-medium mb-2"
          >Сообщение</label
        >
        <textarea
          v-model="formData.message"
          name="message"
          placeholder="Введите ваше сообщение"
          class="w-full h-24 focus:outline-0 rounded p-2 box-border w-full focus:outline-0 focus:ring focus:ring-primary placeholder-zinc-800 text-zinc-900 bg-gray-200"
        />

        <div class="absolute right-3 bottom-1">
          {{ formData.message.length }} / 2000
        </div>
      </div>

      <div class="text-second dark:text-zinc-200 text-sm">
        Нажимая на кнопку "Отправить", я даю согласие на
        <nuxt-link to="/privacy" class="underline hover:text-primary"
          >обработку персональных данных</nuxt-link
        >
      </div>

      <div v-if="error || validate" class="text-red-500 text-sm">
        {{ validate || "Неизвестная ошибка" }}
      </div>
      <div v-if="ok" class="text-green-600 text-sm font-medium">
        Ваше сообщение отправлено, мы вам скоро ответим!
      </div>

      <m-button
        type="submit"
        class="uppercase font-bold"
        :disabled="disabledForm"
        >Отправить</m-button
      >
    </form>
  </div>
</template>

<script setup lang="ts">
import * as yup from "yup";
import { Ref, UnwrapRef } from "vue";
import { useRoute } from "vue-router";
import MBreadCrumbs from "~/components/MBreadCrumbs.vue";
import MButton from "~/components/_core/MButton.vue";
import MInput from "~/components/_core/MInput.vue";
import { Crumb } from "~/types/components/BreadcrumbsType";
import { useSeoStore } from "~/store/seo.store";

const route = useRoute();
const seo = useSeoStore();

interface FormData {
  name: string;
  email: string;
  message: string;
  date: Date;
}

const breadCrumbs: Crumb[] = [
  {
    title: "Контакты",
    link: "",
  },
];

const formData: Ref<UnwrapRef<FormData>> = ref({
  name: "",
  email: "",
  message: "",
  date: new Date(),
});

const disabledForm: Ref<UnwrapRef<boolean>> = ref(false);
const error: Ref<UnwrapRef<boolean>> = ref(false);
const validate: Ref<UnwrapRef<string>> = ref("");
const ok: Ref<UnwrapRef<boolean>> = ref(false);

async function validateForm(): Promise<boolean> {
  const schema = yup.object().shape({
    name: yup.string().required().min(2),
    email: yup.string().required().email(),
    message: yup.string().required().min(10).max(2000),
    date: yup.date().default(function () {
      return new Date();
    }),
  });

  return await schema.isValid(formData.value);
}

async function fetchForm() {
  validate.value = "";
  disabledForm.value = true;

  const valid = await validateForm();
  if (!valid) {
    validate.value = "Некорректный email или имя";
    disabledForm.value = false;
    return;
  }

  await $fetch("https://za-halyavoi.ru/api/petition", {
    method: "post",
    body: formData.value,
  });
  formData.value = {
    name: "",
    email: "",
    message: "",
    date: new Date(),
  };
  ok.value = true;
}

useHead({
  title: `Обратная связь. Промокоды, скидки акции на ${seo.month} ${seo.year} год`,
  meta: [
    {
      hid: "description",
      name: "description",
      content: `Обратная связь. Свежие промокоды, скидки и акции на ${seo.month} ${seo.year} год, а также эксклюзивные купоны. Бегом za халявой!`,
    },
    {
      hid: "keywords",
      name: "keywords",
      content:
        "обратная, связь, сайты, алфавит, промокоды, скидки, акции, магазины, акция, промокод, скидка",
    },
    {
      property: "og:title",
      content: `Промокоды, скидки и акции для сайтов и интернет-магазинов на ${seo.month} ${seo.year} год`,
    },
    {
      property: "og:description",
      name: "og:description",
      content: `Свежие промокоды, скидки и акции на ${seo.month} ${seo.year} год, а также эксклюзивные купоны. бегом za халявой!`,
    },
    {
      property: "og:url",
      content: `https://za-halyavoi.ru${route.fullPath}`,
    },
    {
      property: "og:image",
      content: "https://za-halyavoi.ru/logo.png",
    },
    {
      property: "og:type",
      content: "article",
    },
    {
      property: "og:site_name",
      content: "за халявой",
    },
    {
      property: "og:image:url",
      content: "https://za-halyavoi.ru/logo.png",
    },
  ],
  link: [
    {
      rel: "canonical",
      href: "https://za-halyavoi.ru/contacts",
    },
  ],
});
</script>
