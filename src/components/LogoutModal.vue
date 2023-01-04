<script setup lang="ts">
  import {
    ArrowRightOnRectangleIcon,
    XMarkIcon
  } from '@heroicons/vue/24/outline'
  import { useAuth } from '../stores/auth'
  import { useModals } from '../stores/modals'

  const authStore = useAuth()
  const modalsStore = useModals()

  async function logout() {
    await authStore.logout()
    closeLogoutModal()
  }

  function closeLogoutModal() {
    modalsStore.logoutModal.toogleModal()
  }
</script>

<template>
  <div class="modal-black" @click.self="closeLogoutModal">
    <div class="modal h-52">
      <div class="flex h-full w-full flex-col items-center justify-between">
        <div class="flex w-full flex-col items-start gap-4">
          <header
            class="flex w-full items-center justify-between bg-shark-100 px-6 py-4 dark:bg-shark-900"
          >
            <div class="flex items-center gap-3">
              <div class="rounded-full bg-red-400 p-2 text-red-900">
                <ArrowRightOnRectangleIcon class="w-5" />
              </div>
              <div class="flex flex-col">
                <h4
                  class="flex items-center gap-2 text-zinc-900 dark:text-zinc-100"
                >
                  Encerrar sessão
                </h4>
                <p class="small text-zinc-600 dark:text-zinc-400">
                  Já está indo?
                </p>
              </div>
            </div>
            <div
              class="cursor-pointer rounded-md border border-zinc-600 p-1 dark:border-zinc-400"
              @click="closeLogoutModal"
            >
              <XMarkIcon class="w-4 text-zinc-600 dark:text-zinc-400" />
            </div>
          </header>
          <p class="px-6 text-zinc-700 dark:text-zinc-300">
            Você está prestes fazer logout, tem certeza que deseja sair?
          </p>
        </div>

        <div class="flex w-full items-center gap-4 px-6 pb-4">
          <button
            class="w-full cursor-pointer rounded-lg border border-zinc-800 p-2 text-base font-semibold text-zinc-900 dark:border-zinc-200 dark:text-zinc-100"
            @click="closeLogoutModal"
          >
            Cancelar
          </button>
          <button
            class="w-full cursor-pointer rounded-lg border border-violet-600 bg-violet-600 p-2 text-base font-semibold text-zinc-100"
            @click="logout"
          >
            Sair
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
