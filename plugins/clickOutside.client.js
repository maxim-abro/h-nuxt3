import VClickOutside from "click-outside-vue3/src/v-click-outside";

export default defineNuxtPlugin((app) => {
  app.vueApp.directive("click-outside", VClickOutside);
});
