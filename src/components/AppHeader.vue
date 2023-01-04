<script setup lang="ts">
  import {
    ArrowRightOnRectangleIcon,
    MoonIcon,
    SunIcon
  } from '@heroicons/vue/24/outline'
  import { onClickOutside } from '@vueuse/core'
  import { ref, VueElement } from 'vue'
  import { RouterLink } from 'vue-router'
  import parsiIcon from '../assets/imgs/parsi_icon.png'
  import UserProfile from '../components/UserProfile.vue'
  import { useModals } from '../stores/modals'
  import { useTheme } from '../stores/theme'

  const themeStore = useTheme()
  const modalsStore = useModals()

  const menu = ref<VueElement>()
  const menuDropdownIsOpened = ref<boolean>(false)

  function openLogoutModal() {
    modalsStore.logoutModal.toogleModal()
  }

  function toogleMenuDropdown() {
    menuDropdownIsOpened.value = !menuDropdownIsOpened.value
  }

  function changeTheme() {
    themeStore.isDark = !themeStore.isDark
  }

  onClickOutside(menu, toogleMenuDropdown)
</script>

<template>
  <header class="flex w-full items-center justify-between py-2">
    <div class="md:w-12">
      <RouterLink class="w-fit" to="/"
        ><img :src="parsiIcon" class="w-10"
      /></RouterLink>
    </div>
    <nav>
      <ul class="flex gap-5 text-sm font-medium max-md:hidden">
        <li class="hover-colors relative text-zinc-900 dark:text-zinc-100">
          <RouterLink to="/"> Dashboard </RouterLink>
          <div
            class="absolute -bottom-1 h-px w-full bg-violet-500 opacity-0"
          ></div>
        </li>
        <li
          class="hover-colors relative flex items-center gap-2 text-zinc-900 dark:text-zinc-100"
        >
          <RouterLink to="/transacoes"> Transações </RouterLink>
          <div
            class="absolute -bottom-1 h-px w-full bg-violet-500 opacity-0"
          ></div>
        </li>
        <li
          class="hover-colors relative flex items-center gap-2 text-zinc-900 dark:text-zinc-100"
        >
          <RouterLink to="/categorias"> Categorias </RouterLink>
          <div
            class="absolute -bottom-1 h-px w-full bg-violet-500 opacity-0"
          ></div>
        </li>
        <li
          class="hover-colors relative flex items-center gap-2 text-zinc-900 dark:text-zinc-100"
        >
          <RouterLink to="orcamentos"> Orçamentos </RouterLink>
          <div
            class="absolute -bottom-1 h-px w-full bg-violet-500 opacity-0"
          ></div>
        </li>
      </ul>
    </nav>
    <div class="flex items-center justify-end gap-5 md:w-12">
      <div class="relative">
        <UserProfile
          :showData="false"
          class="cursor-pointer"
          @click="toogleMenuDropdown"
        />

        <div
          class="absolute -bottom-[164px] right-0 z-20 flex min-w-[260px] flex-col items-start gap-3 rounded-md bg-shark-200 px-1 py-2 shadow-md dark:bg-shark-800"
          v-if="menuDropdownIsOpened"
          ref="menu"
        >
          <UserProfile class="px-2" :showData="true" />
          <div class="h-px w-full bg-zinc-300 dark:bg-zinc-700"></div>
          <div class="flex w-full flex-col items-center gap-1">
            <button
              class="flex w-full items-center gap-2 px-2 py-2 text-sm text-zinc-900 hover:bg-shark-100 dark:text-zinc-100 hover:dark:bg-shark-700"
              @click="changeTheme"
            >
              <SunIcon
                v-if="themeStore.isDark"
                class="w-5 text-zinc-900 dark:text-zinc-100"
              />
              <MoonIcon v-else class="w-5 text-zinc-900 dark:text-zinc-100" />
              Alterar tema
            </button>
            <button
              class="flex w-full items-center gap-2 px-2 py-2 text-sm text-zinc-900 hover:bg-shark-100 dark:text-zinc-100 hover:dark:bg-shark-700"
              @click="openLogoutModal"
            >
              <ArrowRightOnRectangleIcon
                class="w-5 cursor-pointer text-zinc-900 dark:text-zinc-100"
              />
              Fazer Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
  .router-link-active {
    @apply text-violet-500;
  }

  .router-link-active + div {
    animation: swipeFromLeft 0.2s ease-out backwards;
    @apply opacity-100;
  }

  @keyframes swipeFromLeft {
    from {
      width: 0;
    }

    to {
      width: 100%;
    }
  }
</style>
