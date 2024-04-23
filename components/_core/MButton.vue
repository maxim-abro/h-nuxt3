<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="getColor"
    class="rounded text-second block p-2"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { ComputedRef, computed } from "vue";

interface ButtonType {
  color?: "primary" | string;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
}

const props = withDefaults(defineProps<ButtonType>(), {
  color: "primary",
  type: "button",
  disabled: false,
});

defineEmits(["click"]);

const getColor = computed<string>(() => {
  if (props.color === "primary") {
    if (!props.disabled) {
      return "bg-primary hover:bg-primary-300 focus:bg-primary-700";
    } else {
      return "bg-primary-200";
    }
  } else {
    return "bg-primary";
  }
});
</script>
