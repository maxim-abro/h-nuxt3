<template>
  <div
    class="bg-second dark:bg-zinc-800 rounded text-white p-5 w-full shadow-md shadow-[#00000070]"
  >
    <div class="font-bold text-xl text-center mb-3">
      Узнавайте первыми про скидки!
    </div>

    <form class="mb-5" @submit.prevent="fetchForm">
      <m-input
        v-model="form.name"
        type="text"
        placeholder="Имя"
        class="mb-2 w-full p-1"
        dark
      />
      <m-input
        v-model="form.email"
        type="email"
        placeholder="email"
        class="mb-2 w-full p-1"
        dark
      />

      <div v-if="error" class="text-red-500 text-sm">{{ error }}</div>
      <div class="flex justify-center my-3">
        <a
          href="https://vk.com/za_halyavoi"
          target="_blank"
          class="h-8 w-auto box-content p-2 hover:bg-zinc-900"
        >
          <svg
            class="h-full w-auto"
            viewBox="0 0 20 20"
            fill="#fdb13c"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.802 12.298s1.617 1.597 2.017 2.336a.127.127 0 0 1 .018.035c.163.273.203.487.123.645-.135.261-.592.392-.747.403h-2.858c-.199 0-.613-.052-1.117-.4-.385-.269-.768-.712-1.139-1.145-.554-.643-1.033-1.201-1.518-1.201a.548.548 0 0 0-.18.03c-.367.116-.833.639-.833 2.032 0 .436-.344.684-.585.684H9.674c-.446 0-2.768-.156-4.827-2.327C2.324 10.732.058 5.4.036 5.353c-.141-.345.155-.533.475-.533h2.886c.387 0 .513.234.601.444.102.241.48 1.205 1.1 2.288 1.004 1.762 1.621 2.479 2.114 2.479a.527.527 0 0 0 .264-.07c.644-.354.524-2.654.494-3.128 0-.092-.001-1.027-.331-1.479-.236-.324-.638-.45-.881-.496.065-.094.203-.238.38-.323.441-.22 1.238-.252 2.029-.252h.439c.858.012 1.08.067 1.392.146.628.15.64.557.585 1.943-.016.396-.033.842-.033 1.367 0 .112-.005.237-.005.364-.019.711-.044 1.512.458 1.841a.41.41 0 0 0 .217.062c.174 0 .695 0 2.108-2.425.62-1.071 1.1-2.334 1.133-2.429.028-.053.112-.202.214-.262a.479.479 0 0 1 .236-.056h3.395c.37 0 .621.056.67.196.082.227-.016.92-1.566 3.016-.261.349-.49.651-.691.915-1.405 1.844-1.405 1.937.083 3.337z"
            />
          </svg>
        </a>

        <a
          href="https://t.me/za_halyavoi"
          target="_blank"
          class="h-8 w-auto box-content p-2 hover:bg-zinc-900"
        >
          <svg
            class="h-full w-auto"
            width="48px"
            height="48px"
            viewBox="0 0 48 48"
            fill="#fdb13c"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M41.4193 7.30899C41.4193 7.30899 45.3046 5.79399 44.9808 9.47328C44.8729 10.9883 43.9016 16.2908 43.1461 22.0262L40.5559 39.0159C40.5559 39.0159 40.3401 41.5048 38.3974 41.9377C36.4547 42.3705 33.5408 40.4227 33.0011 39.9898C32.5694 39.6652 24.9068 34.7955 22.2086 32.4148C21.4531 31.7655 20.5897 30.4669 22.3165 28.9519L33.6487 18.1305C34.9438 16.8319 36.2389 13.8019 30.8426 17.4812L15.7331 27.7616C15.7331 27.7616 14.0063 28.8437 10.7686 27.8698L3.75342 25.7055C3.75342 25.7055 1.16321 24.0823 5.58815 22.459C16.3807 17.3729 29.6555 12.1786 41.4193 7.30899Z"
            />
          </svg>
        </a>

        <a
          href="https://t.me/zahalyavoi_bot"
          target="_blank"
          class="h-8 w-auto box-content p-2 hover:bg-zinc-900"
        >
          <svg
            class="h-full w-auto"
            height="24"
            viewBox="0 0 24 24"
            fill="#fdb13c"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 10.975V8a2 2 0 0 0-2-2h-6V4.688c.305-.274.5-.668.5-1.11a1.5 1.5 0 0 0-3 0c0 .442.195.836.5 1.11V6H5a2 2 0 0 0-2 2v2.998l-.072.005A.999.999 0 0 0 2 12v2a1 1 0 0 0 1 1v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a1 1 0 0 0 1-1v-1.938a1.004 1.004 0 0 0-.072-.455c-.202-.488-.635-.605-.928-.632zM7 12c0-1.104.672-2 1.5-2s1.5.896 1.5 2-.672 2-1.5 2S7 13.104 7 12zm8.998 6c-1.001-.003-7.997 0-7.998 0v-2s7.001-.002 8.002 0l-.004 2zm-.498-4c-.828 0-1.5-.896-1.5-2s.672-2 1.5-2 1.5.896 1.5 2-.672 2-1.5 2z"
            />
          </svg>
        </a>
      </div>
      <m-button
        v-if="validateForm"
        type="submit"
        :disabled="disabledForm"
        class="bg-primary text-second font-medium uppercase w-full p-1"
        >Подписаться</m-button
      >
    </form>

    <div class="text-xs text-zinc-500 w-10/12 mx-auto text-center">
      Нажимая на кнопку «Подписаться», я даю согласие на
      <nuxt-link
        class="underline text-zinc-500 hover:text-primary transition-all duration-300 hover:transition-all hover:duration-300"
        to="/privacy"
        >обработку персональных данных.</nuxt-link
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import * as yup from "yup";
import { Ref, UnwrapRef } from "vue";
import MInput from "~/components/_core/MInput.vue";
import MButton from "~/components/_core/MButton.vue";

interface TypeForm {
  email: string;
  name: string;
}

const form: Ref = ref<TypeForm>({
  email: "",
  name: "",
});

const error = ref<string>("");
const disabledForm: Ref = ref<boolean>(false);

async function validateForm(): Promise<boolean> {
  const schema = yup.object().shape({
    email: yup.string().required().email(),
    name: yup.string().required().min(2),
    date: yup.date().default(function () {
      return new Date();
    }),
  });

  return await schema.isValid(form.value);
}

async function fetchForm() {
  disabledForm.value = true;
  const validate: boolean = await validateForm();
  if (!validate) {
    error.value = "Некорректный email или имя";
    disabledForm.value = false;
    return;
  }
  // await this.$api.post('/subscriber', this.form)
  error.value = "";
  form.value.email = "";
  form.value.name = "";
  disabledForm.value = false;
}
</script>
