<script setup lang="ts">
  import {
    ArrowsRightLeftIcon,
    BanknotesIcon,
    HomeIcon,
    RectangleStackIcon
  } from '@heroicons/vue/24/outline'
  import { RouterLink } from 'vue-router'
</script>

<template>
  <nav
    class="fixed bottom-0 h-20 w-full rounded-t-2xl bg-shark-100 dark:bg-zinc-900 lg:hidden"
  >
    <ul
      class="flex h-full w-full items-center justify-evenly text-zinc-900 dark:text-zinc-100"
    >
      <li class="hover-colors">
        <RouterLink to="/">
          <HomeIcon class="w-5" />
        </RouterLink>
      </li>
      <li class="hover-colors">
        <RouterLink to="/transacoes">
          <ArrowsRightLeftIcon class="w-5" />
        </RouterLink>
      </li>
      <li class="hover-colors">
        <RouterLink to="/categorias">
          <RectangleStackIcon class="w-5" />
        </RouterLink>
      </li>
      <li class="hover-colors">
        <RouterLink to="/orcamentos">
          <BanknotesIcon class="w-5" />
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
  .router-link-active {
    @apply text-violet-500;
  }
</style>
