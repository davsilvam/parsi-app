<script setup lang="ts">
  import {
    ChevronDownIcon,
    ChevronUpIcon,
    MagnifyingGlassIcon,
    PlusSmallIcon,
    TrashIcon
  } from '@heroicons/vue/24/outline'
  import { ref, watchEffect } from 'vue'
  import AppHeader from '../components/AppHeader.vue'
  import { CategoryType, useCategories } from '../stores/categories'
  import { useModals } from '../stores/modals'

  const categoriesStore = useCategories()
  const modalsStore = useModals()

  const userCategories = ref<CategoryType[]>(categoriesStore.categories)
  const currentCategories = ref<CategoryType[]>()

  const nameSorting = ref<boolean>(true)
  const typeSorting = ref<boolean>(true)

  function sortByName() {
    nameSorting.value = !nameSorting.value

    nameSorting.value ? sortAscendingName() : sortDescendingName()
  }

  function sortByType() {
    typeSorting.value = !typeSorting.value

    typeSorting.value ? sortAscendingType() : sortDescendingType()
  }

  function sortAscendingName() {
    currentCategories.value.sort((x, y) => {
      let a = x.name,
        b = y.name
      return a == b ? 0 : a > b ? 1 : -1
    })
  }

  function sortDescendingName() {
    currentCategories.value.sort((x, y) => {
      let a = x.name,
        b = y.name
      return a == b ? 0 : a > b ? -1 : 1
    })
  }

  function sortAscendingType() {
    currentCategories.value.sort((x, y) => {
      let a = x.type,
        b = y.type
      return a == b ? 0 : a > b ? 1 : -1
    })
  }

  function sortDescendingType() {
    currentCategories.value.sort((x, y) => {
      let a = x.type,
        b = y.type
      return a == b ? 0 : a > b ? -1 : 1
    })
  }

  const search = ref<string>('')

  function filterCategoriesWithSearchValue(search: string) {
    const filteredCategories = ref(
      userCategories.value.filter((category) => category.name.includes(search))
    )

    currentCategories.value = filteredCategories.value
  }

  watchEffect(() => {
    userCategories.value = categoriesStore.categories
    filterCategoriesWithSearchValue(search.value)
  })

  function openDeleteCategoryModal(id: string) {
    categoriesStore.currentCategoryEditingId = id
    modalsStore.deleteCategoryModal.toogleModal()
  }
</script>

<template>
  <main
    class="flex min-h-screen w-full flex-col items-center justify-start gap-5 px-4 py-6 pb-24 md:pb-16 lg:px-[100px]"
  >
    <AppHeader />
    <section class="flex min-w-full flex-col items-start justify-center gap-5">
      <div class="flex items-center justify-center gap-2">
        <h1 class="font-semibold text-zinc-900 dark:text-zinc-100">
          Categorias
        </h1>
        <span
          class="rounded-lg bg-violet-500 px-2 py-1 text-xs text-violet-900"
        >
          {{ currentCategories.length }}
        </span>
      </div>

      <div
        class="flex w-full flex-col items-center justify-center rounded-lg bg-shark-100 pt-4 dark:bg-zinc-900"
      >
        <header class="flex w-full items-center justify-between px-4 pb-4">
          <div
            class="flex w-52 items-center gap-2 rounded-md bg-shark-300 px-4 py-2 text-zinc-900 dark:bg-shark-700 dark:text-zinc-100"
          >
            <MagnifyingGlassIcon class="w-5" />
            <input
              class="w-full bg-transparent text-sm placeholder:text-zinc-600 dark:placeholder:text-zinc-500"
              type="text"
              placeholder="Alimentação..."
              v-model="search"
            />
          </div>

          <button
            class="flex items-center gap-1 text-sm text-zinc-700 dark:text-zinc-300"
            @click="modalsStore.addCategoryModal.toogleModal()"
          >
            Adicionar
            <span class="hidden md:block">categoria</span>
            <PlusSmallIcon class="w-5" />
          </button>
        </header>
        <table
          v-if="categoriesStore.categories.length > 0"
          class="w-full border-collapse"
        >
          <thead align="left" class="w-full">
            <tr
              class="bg-shark-200 uppercase text-zinc-700 dark:bg-shark-700 dark:text-zinc-300"
            >
              <th
                @click="sortByName"
                class="cursor-pointer py-3 pl-5 font-semibold"
                colspan="3"
              >
                <p class="flex items-center gap-2 text-xs">
                  Categoria
                  <ChevronDownIcon v-if="nameSorting" class="w-4" />
                  <ChevronUpIcon v-else class="w-4" />
                </p>
              </th>
              <th
                @click="sortByType"
                class="cursor-pointer px-2 py-3 font-semibold"
                colspan="2"
              >
                <p class="flex items-center gap-2 text-xs">
                  Tipo
                  <ChevronDownIcon v-if="typeSorting" class="w-4" />
                  <ChevronUpIcon v-else class="w-4" />
                </p>
              </th>
            </tr>
          </thead>
          <tbody class="text-sm text-zinc-900 dark:text-zinc-100">
            <tr
              class="border-b border-zinc-200 dark:border-zinc-800"
              v-for="(category, index) in currentCategories"
              :key="index"
            >
              <td class="py-4 pl-5 font-bold" colspan="3">
                <p class="flex items-center gap-1">
                  {{ category.name }}
                </p>
              </td>
              <td colspan="1">
                <div class="flex items-center gap-2">
                  <div
                    class="rounded-lg p-1"
                    :class="[
                      category.type === 'income' ? 'bg-green-500' : 'bg-red-500'
                    ]"
                  ></div>
                  <p class="text-sm font-semibold">
                    {{ category.type === 'income' ? 'Ganho' : 'Despesa' }}
                  </p>
                </div>
              </td>
              <td align="right" class="pr-5" colspan="1">
                <TrashIcon
                  class="w-5 cursor-pointer text-zinc-700 dark:text-zinc-300"
                  @click="openDeleteCategoryModal(category.id)"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <h4 class="pb-4 text-zinc-700 dark:text-zinc-300" v-else>
          Ainda não há categorias...
        </h4>
      </div>
    </section>
  </main>
</template>
