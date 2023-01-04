<script setup lang="ts">
  import {
    ArrowTrendingDownIcon,
    ArrowTrendingUpIcon,
    TagIcon,
    XMarkIcon
  } from '@heroicons/vue/24/outline'
  import { ref, watchEffect } from 'vue'
  import { CategoryType } from '../stores/categories'
  import { useModals } from '../stores/modals'
  import { useUser } from '../stores/user'
  import InputSubmitButton from './FormInputSubmitButton.vue'

  const modalsStore = useModals()
  const userStore = useUser()

  const disabled = ref<boolean>(true)

  const category = ref<CategoryType>({
    name: '',
    type: null
  })

  function fieldsAreFilled() {
    return category.value.name && category.value.type
  }

  function handleSubmitButtonSituation() {
    fieldsAreFilled() ? (disabled.value = false) : (disabled.value = true)
  }

  watchEffect(() => handleSubmitButtonSituation())

  function checkForm() {
    fieldsAreFilled()
      ? submitCategory()
      : alert('Preencha todos os campos, por favor!')
  }

  function submitCategory() {
    userStore.postCategoryUser(category.value)
    closeCategoryModal()
  }

  function closeCategoryModal() {
    modalsStore.addCategoryModal.toogleModal()
  }
</script>

<template>
  <div class="modal-black" @click.self="closeCategoryModal">
    <div class="modal h-96">
      <form
        class="flex h-full w-full flex-col items-center justify-between"
        @submit.prevent="checkForm"
      >
        <div class="flex w-full flex-col items-start gap-4">
          <header
            class="flex w-full items-center justify-between bg-shark-100 px-6 py-4 dark:bg-shark-900"
          >
            <div class="flex items-center gap-3">
              <div class="rounded-full bg-violet-400 p-2 text-violet-900">
                <TagIcon class="w-5" />
              </div>
              <div class="flex flex-col">
                <h4
                  class="flex items-center gap-2 text-zinc-900 dark:text-zinc-100"
                >
                  Nova Categoria
                </h4>
                <p class="small text-zinc-600 dark:text-zinc-400">
                  Crie uma nova categoria.
                </p>
              </div>
            </div>
            <div
              class="rounded-md border border-zinc-500 p-1 dark:border-zinc-400"
              @click="closeCategoryModal"
            >
              <XMarkIcon
                class="w-4 cursor-pointer text-zinc-500 dark:text-zinc-400"
              />
            </div>
          </header>
          <div class="flex w-full flex-col gap-4 px-6">
            <div class="flex w-full flex-col gap-2">
              <label
                class="text-base text-zinc-900 dark:text-zinc-200"
                for="name"
              >
                Nome
              </label>
              <input
                id="name"
                type="text"
                class="w-full border-b border-violet-600 bg-transparent pb-2 text-zinc-900 dark:text-zinc-100"
                v-model="category.name"
              />
            </div>
            <h4 class="text-base text-zinc-900 dark:text-zinc-200">Tipo</h4>
            <div class="flex w-full items-center justify-around gap-2">
              <label
                class="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-zinc-500 py-2 text-sm text-zinc-900 transition-colors duration-150 dark:text-zinc-100"
                for="income"
                id="labelIncome"
              >
                <input
                  v-model="category.type"
                  class="hidden"
                  value="income"
                  id="income"
                  type="radio"
                />
                Ganho
                <ArrowTrendingUpIcon class="w-5" />
              </label>
              <label
                class="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-zinc-500 py-2 text-sm text-zinc-900 transition-colors duration-150 dark:text-zinc-100"
                id="labelExpense"
                for="expense"
              >
                <input
                  v-model="category.type"
                  class="hidden checked:border-red-500 checked:bg-red-500"
                  value="expense"
                  id="expense"
                  type="radio"
                />
                Despesa
                <ArrowTrendingDownIcon class="w-5" />
              </label>
            </div>
          </div>
        </div>

        <div class="w-full px-6 pb-4">
          <InputSubmitButton :value="'Registrar'" :disabled="disabled" />
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
  #labelIncome:has(> input:checked) {
    @apply border-green-500 bg-green-500 text-green-900;
  }

  #labelExpense:has(> input:checked) {
    @apply border-red-500 bg-red-500 text-red-900;
  }
</style>
