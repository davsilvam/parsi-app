<script setup lang="ts">
  import { ShieldExclamationIcon, XMarkIcon } from '@heroicons/vue/24/outline'
  import { useCategories } from '../stores/categories'
  import { useModals } from '../stores/modals'
  import { useUser } from '../stores/user'

  const categoriesStore = useCategories()
  const modalsStore = useModals()
  const userStore = useUser()

  async function deleteCategory() {
    modalsStore.deleteCategoryModal.toogleModal()
    await userStore.deleteCategoryUser(categoriesStore.currentCategoryEditingId)
  }

  function closeDeleteCategoryModal() {
    modalsStore.deleteCategoryModal.toogleModal()
    categoriesStore.currentCategoryEditingId = null
  }
</script>

<template>
  <div class="modal-black" @click.self="closeDeleteCategoryModal">
    <div class="modal h-52">
      <div class="flex h-full w-full flex-col items-center justify-between">
        <div class="flex w-full flex-col items-start gap-4">
          <header
            class="flex w-full items-center justify-between bg-shark-100 px-6 py-4 dark:bg-shark-900"
          >
            <div class="flex items-center gap-3">
              <div class="rounded-full bg-red-400 p-2 text-red-900">
                <ShieldExclamationIcon class="w-5" />
              </div>
              <div class="flex flex-col">
                <h4
                  class="flex items-center gap-2 text-zinc-900 dark:text-zinc-100"
                >
                  Deletar categoria
                </h4>
                <p class="small text-zinc-600 dark:text-zinc-400">
                  Delete uma categoria.
                </p>
              </div>
            </div>
            <div
              class="cursor-pointer rounded-md border border-zinc-600 p-1 dark:border-zinc-400"
              @click="closeDeleteCategoryModal"
            >
              <XMarkIcon class="w-4 text-zinc-600 dark:text-zinc-400" />
            </div>
          </header>
          <p class="px-6 text-zinc-700 dark:text-zinc-300">
            Você está prestes a deletar uma categoria, tem certeza disso?
          </p>
        </div>

        <div class="flex w-full items-center gap-4 px-6 pb-4">
          <button
            class="button-primary border-zinc-800 text-zinc-900 dark:border-zinc-200 dark:text-zinc-100"
            @click="closeDeleteCategoryModal"
          >
            Cancelar
          </button>
          <button class="button-primary danger-button" @click="deleteCategory">
            Deletar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
