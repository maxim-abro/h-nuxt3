<template>
  <input
    v-model="inputData"
    :type="type"
    :placeholder="placeholder"
    :name="name"
    class="focus:outline-0 dark:bg-zinc-700 dark:text-white dark:placeholder:text-zinc-200 rounded p-2 box-border w-full focus:ring focus:ring-primary"
    :class="
      dark
        ? 'bg-zinc-700 text-zinc-300'
        : 'placeholder-zinc-800 text-zinc-900 bg-gray-200'
    "
    @input="$emit('update:modelValue', $event.target.value)"
    @blur="$emit('blur')"
    @change="$emit('change', $event)"
  />
</template>

<script setup lang="ts">
import { UnwrapRef } from "vue";
import { Ref } from "@vue/reactivity";

interface InputType {
  type?:
    | "text"
    | "email"
    | "password"
    | "range"
    | "search"
    | "tel"
    | "url"
    | "time"
    | "week"
    | "number"
    | "file"
    | "date";
  placeholder?: string;
  name?: string;
  inputProp?: string;
  dark?: boolean;
}

const props = withDefaults(defineProps<InputType>(), {
  type: "text",
  placeholder: "",
  name: "",
  inputProp: "",
  dark: false,
});

const emit = defineEmits(["update:modelValue", "blur", "change"]);

function updateValue(value: string) {
  emit("update:modelValue", value);
}

const inputData: Ref<UnwrapRef<string>> = ref(props.inputProp);
</script>
