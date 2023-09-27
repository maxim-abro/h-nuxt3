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
import {ComputedRef, Ref} from "@vue/reactivity";
import {computed, ref, UnwrapRef} from "vue";

interface ButtonType {
  color?: 'primary' | string
  type?: 'button'| 'submit' | 'input' | string
  disabled?: boolean
}

const props = withDefaults(defineProps<ButtonType>(), {
  color: "primary",
  type: "button",
  disabled: false
})

const primary:Ref<UnwrapRef<string>> = ref('')

const getColor:ComputedRef<string> = computed(() => {
  if (props.color === 'primary') {
    if (!props.disabled) {
      return 'bg-primary hover:bg-primary-300 focus:bg-primary-700'
    } else {
      return 'bg-primary-200'
    }
  } else {
    return 'bg-primary'
  }
})
</script>
