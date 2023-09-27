<template>
  <div
      v-if="popup.openPopup"
      class="bg-[#00000050] backdrop-blur w-full h-full fixed left-0 top-0 overflow-auto p-8 z-50"
      @click.self="popup.closePopup()"
  >
    <div
        class="bg-white dark:bg-zinc-800 mx-auto w-full md:translate-y-1/2 lg:w-9/12 xl:w-auto xl:max-w-[750px]"
    >
      <!-------------Топ----------------------------->
      <div class="flex items-center justify-between mb-5 relative p-4">
        <div
            class="flex items-center w-full sm:justify-start justify-center flex-col md:flex-row"
        >
          <img
              v-if="popup.popupData.shop"
              :title="popup.popupData.shop.title"
              loading="lazy"
              class="md:mr-3 h-[59px]"
              :src="
              'https://za-halyavoi.ru/api/static/' +
              popup.popupData.shop.image
            "
              :alt="popup.popupData.shop.title"
              @click="$router.push(`/to/${popup.popupData.uin}`)"
          />

          <div class="md:mr-3 w-full md:w-auto">
            <div class="text-xl text-center font-bold mb-1 sm:mr-6">
              {{ popup.popupData.title }}
            </div>
            <div class="text-xs text-zinc-500">
              {{
                `Действует до ${new Date(
                    popup.popupData.endDate
                ).toLocaleDateString('ru-RU', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}`
              }}
            </div>
          </div>
        </div>

        <button
            class="self-start text-3xl px-2 hover:text-red-700 hover:bg-zinc-200 flex justify-center absolute right-4 top-4 items-center transition-all duration-300"
            @click="popup.closePopup()"
        >
          <fa icon="xmark" />
        </button>
      </div>
      <!-------------Топ-конец----------------------->

      <!-------------Центр--------------------------->
      <div class="bg-zinc-100 dark:bg-zinc-900 p-3 sm:px-5 sm:py-5">
        <div
            v-if="popup.popupData.shop"
            class="text-zinc-700 dark:text-zinc-200 text-center mb-5"
        >
          Переходите на сайт
          <a
              target="_blank"
              class="text-primary hover:text-second transition-all duration-300"
              :href="popup.popupData.url"
          >{{ popup.popupData.shop.title }}</a
          >
          {{
            popup.popupData.type === 'promoCode'
                ? 'и используйте промокод'
                : ''
          }}
        </div>

        <div
            v-if="popup.popupData.type === 'promoCode'"
            class="relative mb-5"
        >
          <div
              class="bg-white dark:bg-zinc-800 text-center py-2 font-bold text-2xl"
          >
            {{ popup.popupData.code }}
          </div>
          <button
              class="bg-second text-primary px-4 h-full absolute right-0 top-0 text-xl w-14"
              @click="copyBuffer"
          >
            <transition
                enter-active-class="transition-all duration-300 ease-in"
                leave-active-class="transition-all duration-300 ease-out"
                enter-class="opacity-0 -translate-y-full"
                enter-to-class="opacity-100 translate-y-0"
                leave-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 -translate-y-full"
            >
              <fa v-if="!copied" icon="clone" />
            </transition>

            <transition
                enter-active-class="transition-all duration-300 ease-in"
                leave-active-class="transition-all duration-300 ease-out"
                enter-class="opacity-0 -translate-y-full"
                enter-to-class="opacity-100 translate-y-0"
                leave-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 -translate-y-full"
            >
              <fa v-if="copied" icon="check" />
            </transition>
          </button>
        </div>

        <div
            class="sm:px-10 text-zinc-700 dark:text-zinc-200 mb-8 text-sm sm:text-base"
            v-html="popup.popupData.description"
        ></div>

        <a
            :href="popup.popupData.url"
            target="_blank"
            class="w-full sm:w-1/2 text-center bg-primary text-second font-medium block mx-auto py-3 hover:shadow hover:shadow-xl transition-all duration-300 mb-5"
        >
          <fa icon="check" class="mr-2" />
          {{
            popup.popupData.type === 'promoCode'
                ? 'Использовать код'
                : 'Перейти к акции'
          }}
        </a>

        <div
            class="text-zinc-700 dark:text-zinc-200 mx-auto w-max flex items-center cursor-pointer"
        >
          <fa icon="share" class="text-primary mr-2" />
          <span class="text-xs">Поделиться</span>
        </div>
      </div>
      <!-------------Центр-конец--------------------->

      <!-------------Низ----------------------------->

      <!-------------Низ-конец----------------------->
    </div>
  </div>
</template>

<script setup lang="ts">

import {UnwrapRef} from "vue";
import {Ref} from "@vue/reactivity";
import {usePopupStore} from "~/store/popup.store";

const popup = usePopupStore()

const copied: Ref<UnwrapRef<boolean>> = ref(false)

function copyBuffer():void {
  navigator.clipboard.writeText(popup.popupData.code)
}
</script>
