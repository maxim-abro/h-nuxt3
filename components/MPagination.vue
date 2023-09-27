<template>
  <div>
    <nav class="relative z-0 inline-flex w-max-full" aria-label="Pagination">
      <a
          v-if="!(firstPageSelected() && hidePrevNext)"
          :class="[firstPageSelected() ? disabledClass : '']"
          :tabindex="firstPageSelected() ? -1 : 0"
          class="relative rounded inline-flex items-center text-xs lg:text-base px-1 md:px-4 py-0 md:py-2 mx-0.5 xl:mx-2 border border-gray-300 dark:border-zinc-700"
          @click="prevPage()"
          @keyup.enter="prevPage()"
      >
        <span class="sr-only">Previous</span>
        <svg
            width="8"
            height="14"
            viewBox="0 0 10 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
          <path
              d="M8 2L2 8L8 14"
              stroke="#4D4D4D"
              stroke-width="2"
              stroke-linecap="square"
          />
        </svg>
      </a>

      <template v-for="page in pages">
        <a
            v-if="page.breakView"
            :key="page.index"
            class="relative rounded inline-flex items-center text-xs lg:text-base px-1 md:px-4 py-0 md:py-2 mx-0.5 xl:mx-2 dark:bg-zinc-800 dark:border-zinc-700"
            :class="[defaultClass]"
            tabindex="0"
        >
          <slot name="breakViewContent">{{ breakViewText }}</slot>
        </a>

        <a
            v-else-if="page.disabled"
            :key="page.index"
            class="relative rounded inline-flex items-center text-xs lg:text-base px-1 md:px-4 py-0 md:py-2 mx-0.5 xl:mx-2 dark:bg-zinc-800 dark:border-zinc-700"
            :class="[activeClass, disabledClass]"
            tabindex="0"
        >{{ page.content }}</a
        >

        <a
            v-else
            :key="page.index"
            class="relative rounded inline-flex items-center text-xs lg:text-base px-1 md:px-4 py-0 md:py-2 mx-0.5 xl:mx-2"
            :class="[page.selected ? activeClass : defaultClass]"
            tabindex="0"
            @click="handlePageSelected(page.index + 1)"
            @keyup.enter="handlePageSelected(page.index + 1)"
        >{{ page.content }}</a
        >
      </template>

      <a
          v-if="!(lastPageSelected() && hidePrevNext)"
          :class="[lastPageSelected() ? disabledClass : '']"
          :tabindex="lastPageSelected() ? -1 : 0"
          class="relative rounded inline-flex items-center text-xs lg:text-base px-1 md:px-4 py-0 md:py-2 mx-0.5 xl:mx-2 border border-gray-300 dark:bg-zinc-800 dark:border-zinc-700"
          @click="nextPage()"
          @keyup.enter="nextPage()"
      >
        <span class="sr-only">Next</span>
        <svg
            width="8"
            height="14"
            viewBox="0 0 10 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
          <path
              d="M2 14L8 8L2 2"
              stroke="#4D4D4D"
              stroke-width="2"
              stroke-linecap="square"
          />
        </svg>
      </a>
    </nav>
  </div>
</template>

<script setup lang="ts">
import {ComputedRef, Ref, WritableComputedRef} from "@vue/reactivity";
import {computed, UnwrapRef} from "vue";
import {useRouter} from "vue-router";

const router = useRouter()
const emit = defineEmits(['update:modelValue'])

interface PaginationType {
  value?: number
  pageCount: number
  forcePage?: number
  clickHandler?: any
  pageRange?: number
  marginPage?: number
  breakViewText?:string
  defaultClass?: string
  activeClass?: string
  disabledClass?: string
  hidePrevNext?: boolean
}

const props = withDefaults(defineProps<PaginationType>(), {
  value: 0,
  pageCount: 0,
  forcePage: 0,
  clickHandler: () => {},
  pageRange: 3,
  marginPages: 3,
  breakViewText: '…',
  defaultClass: 'border border-gray-300 text-gray-500 hover:bg-gray-50 cursor-pointer dark:border-zinc-700',
  activeClass: 'bg-primary border border-primary text-second dark:border-zinc-700',
  disabledClass: 'cursor-not-allowed',
  hidePrevNext: false,
})

const innerValue: Ref<UnwrapRef<number>> = ref(1)

const selected:WritableComputedRef<number> = computed({
  get() {
    return props.value || innerValue.value
  },
  set(newValue: number) {
    innerValue.value = newValue
  }
})

const pages = computed(() => {
  const items:object = {}
  if(props.pageCount <= props.pageRange) {
    for (let index = 0; index < props.pageCount; index++) {
      items[index] = {
        index,
        content: index + 1,
        selected: index === selected.value - 1,
      }
    }
  } else {
    const halfPageRange = Math.floor(props.pageRange / 2)
    const setPageItem = (index:number) => {
      items[index] = {
        index,
        content: index + 1,
        selected: index === selected.value - 1,
      }
    }
    const setBreakView = (index:number) => {
      items[index] = {
        disabled: true,
        breakView: true,
      }
    }
    // 1st - loop thru low end of margin pages
    for (let i = 0; i < props.marginPages; i++) {
      setPageItem(i)
    }
    // 2nd - loop thru selected range
    let selectedRangeLow = 0
    if (selected.value - halfPageRange > 0) {
      selectedRangeLow = selected.value - 1 - halfPageRange
    }
    let selectedRangeHigh = selectedRangeLow + props.pageRange - 1
    if (selectedRangeHigh >= props.pageCount) {
      selectedRangeHigh = props.pageCount - 1
      selectedRangeLow = selectedRangeHigh - props.pageRange + 1
    }
    for (
        let i = selectedRangeLow;
        i <= selectedRangeHigh && i <= props.pageCount - 1;
        i++
    ) {
      setPageItem(i)
    }
    // Check if there is breakView in the left of selected range
    if (selectedRangeLow > props.marginPages) {
      setBreakView(selectedRangeLow - 1)
    }
    // Check if there is breakView in the right of selected range
    if (selectedRangeHigh + 1 < props.pageCount - props.marginPages) {
      setBreakView(selectedRangeHigh + 1)
    }
    // 3rd - loop thru high end of margin pages
    for (
        let i = props.pageCount - 1;
        i >= props.pageCount - props.marginPages;
        i--
    ) {
      setPageItem(i)
    }
  }
  return items
})





function handlePageSelected(selectedIn: number) {
  if (selected.value === selectedIn) return
  innerValue.value = selectedIn
  emit('update:modelValue', selectedIn)
  props.clickHandler(selectedIn)
}

function prevPage() {
  if (selected.value <= 1) return
  handlePageSelected(selected.value - 1)
}
function nextPage() {
  if (selected.value >= props.pageCount) return
  handlePageSelected(selected.value + 1)
}
function firstPageSelected() {
  return selected.value === 1
}
function lastPageSelected() {
  return selected.value === props.pageCount || props.pageCount === 0
}
</script>
