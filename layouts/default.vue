<template>
  <div class="dark:bg-zinc-900 dark:text-zinc-200">
    <m-header :holiday="header.holiday" />

    <div class="container flex flex-col lg:flex-row mt-3 sm:mt-10">
      <main class="w-full lg:w-9/12 mr-0 lg:mr-4 mb-10 lg:mb-0">
        <!--        <div id="yandex_rtb_R-A-1753947-2" class="mb-2 sm:mb-5"></div>-->
        <!--        <script>window.yaContextCb.push(function(){-->
        <!--          return Ya.Context.AdvManager.render({-->
        <!--            renderTo: 'yandex_rtb_R-A-1753947-2',-->
        <!--            blockId: 'R-A-1753947-2'-->
        <!--          })-->
        <!--        })</script>-->

        <slot />
      </main>

      <aside class="w-full lg:w-3/12 mr-0 lg:ml-3">
        <m-aside class="mb-8" />
        <m-popular-aside :popular="aside.popular" class="mb-8" />
        <m-popular-categories-aside
          :popular-categories="aside.popularCategories"
          class="mb-8"
        />

        <!--        &lt;!&ndash; Yandex.RTB R-A-1753947-1 &ndash;&gt;-->
        <!--        <div id="yandex_rtb_R-A-1753947-1"></div>-->
        <!--        <script>window.yaContextCb.push(function(){-->
        <!--          Ya.Context.AdvManager.render({-->
        <!--            renderTo: 'yandex_rtb_R-A-1753947-1',-->
        <!--            blockId: 'R-A-1753947-1'-->
        <!--          })-->
        <!--        })</script>-->
      </aside>
    </div>

    <m-footer />
    <m-popup-coupon />
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
import MPopupCoupon from "~/components/popups/MPopupCoupon.vue";
import MPopularAside from "~/components/aside/MPopularAside.vue";
import MPopularCategoriesAside from "~/components/aside/MPopularCategoriesAside.vue";
import MFooter from "~/components/MFooter.vue";
import MHeader from "~/components/header/MHeader.vue";
import MAside from "~/components/aside/MAside.vue";
import { useAsideStore } from "~/store/aside.store";
import { useHeaderStore } from "~/store/header.store";

const aside = useAsideStore();
const header = useHeaderStore();
</script>
