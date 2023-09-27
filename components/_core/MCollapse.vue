<template>
  <div :class="`${className} ${showContent ? '' : 'collapsed'}`">
    <component
        :is="triggerTag"
        :class="triggerClass"
        @click="showContent = !showContent"
    >
      <slot name="trigger" />
    </component>

    <transition
        v-if="animation"
        enter-active-class="duration-500 ease"
        enter-class="overflow-hidden max-h-0"
        enter-to-class="max-h-[500px] overflow-hidden"
        leave-active-class="duration-500 ease-[cubic-bezier(0, 1, 0.5, 1)]"
        leave-class="max-h-[500px] overflow-hidden"
        leave-to-class="overflow-hidden max-h-0"
    >
      <slot v-if="showContent" name="content" />
    </transition>
    <template v-else>
      <slot v-if="showContent" name="content" />
    </template>
  </div>
</template>

<script setup lang="ts">
import {Ref} from "@vue/reactivity";
import {UnwrapRef} from "vue";
interface CollapseType {
  isVisible?: boolean
  className?: string
  triggerTag?: string
  triggerClass?: string
  animation?: boolean
}
const props = withDefaults(defineProps<CollapseType>() , {
  isVisible: false,
  className: 'collapse flex flex-col',
  triggerTag: 'div',
  triggerClass: '',
  animation: false,
})

const emit = defineEmits(['trigger'])

const showContent: Ref<UnwrapRef<boolean>> = ref(props.isVisible)


watch(() => showContent.value, () => {
  emit('trigger', showContent.value)
})
</script>

<style scoped>
.collapsed .arrow {
  @apply rotate-180
}
</style>
