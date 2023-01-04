<script setup lang="ts">
  import { TagIcon } from '@heroicons/vue/24/outline'
  import { ref, watchEffect } from 'vue'
  import { useCategories } from '../stores/categories'
  import { useTransactions } from '../stores/transactions'

  const prop = defineProps<{ selectMessage: string }>()
  const emit = defineEmits<{
    (e: 'category', category: string): void
  }>()

  const categoriesStore = useCategories()
  const transactionsStore = useTransactions()

  type SelectInput = {
    isOpened: boolean
    displayMessage: string
    currentCategory: string
  }

  const selectInput = ref<SelectInput>({
    isOpened: false,
    displayMessage: prop.selectMessage,
    currentCategory: ''
  })

  const filteredCategory = ref(
    categoriesStore.filterCategoriesByType(transactionsStore.transactionType)
  )

  function getFilteredCategoriesByType() {
    filteredCategory.value = categoriesStore.filterCategoriesByType(
      transactionsStore.transactionType
    )
  }

  watchEffect(() => {
    getFilteredCategoriesByType()
  })

  function emitCategoryValue() {
    emit('category', selectInput.value.currentCategory)
  }

  function toogleSelect() {
    selectInput.value.isOpened = !selectInput.value.isOpened
  }

  function changeCategory(category: string) {
    selectInput.value.displayMessage = category
    selectInput.value.currentCategory = category
    emitCategoryValue()
    toogleSelect()
  }
</script>

<template>
  <div class="flex flex-col gap-1">
    <div
      class="hover-ring flex cursor-pointer items-center justify-between gap-1 rounded-md bg-shark-100 px-3 py-2 text-sm text-zinc-900 shadow-md dark:bg-shark-700 dark:text-zinc-300"
      @click="toogleSelect"
    >
      {{ selectInput.displayMessage }} <TagIcon class="w-5" />
    </div>
    <div
      class="flex max-h-24 flex-col gap-1 overflow-y-auto rounded-md bg-shark-100 py-2 text-sm shadow-md dark:bg-shark-700"
      v-if="selectInput.isOpened"
    >
      <div
        class="cursor-pointer px-3 py-1 text-zinc-800 transition-colors duration-300 hover:bg-violet-500 dark:text-zinc-300 dark:hover:bg-violet-600"
        v-for="category in filteredCategory"
        :key="category.id"
        @click="changeCategory(category.name)"
      >
        {{ category.name }}
      </div>
    </div>
  </div>
</template>

<style scoped>
  div::-webkit-scrollbar {
    @apply w-1;
  }

  div::-webkit-scrollbar-track {
    @apply bg-shark-100 dark:bg-zinc-700;
  }

  div::-webkit-scrollbar-thumb {
    @apply rounded-sm bg-violet-600;
  }
</style>
