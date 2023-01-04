<script setup lang="ts">
  import { CheckIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <div class="fixed bottom-24 right-3 z-10 md:bottom-10">
    <div
      class="flex items-center gap-4 bg-shark-100 px-6 py-4 shadow-md dark:bg-shark-900"
    >
      <div class="rounded-full bg-green-400 p-1">
        <CheckIcon class="w-6 text-green-900" />
      </div>
      <p class="font-medium text-zinc-900 dark:text-zinc-100">
        Transação adicionada com sucesso!
      </p>
    </div>
    <div class="flex h-[2px] w-full bg-green-500">
      <div class="bar w-full bg-shark-200 dark:bg-shark-700"></div>
    </div>
  </div>
</template>

<style scoped>
  .bar {
    transform: rotate(180deg);
    animation: bar 3s ease-in-out backwards;
  }

  @keyframes bar {
    from {
      width: 0%;
    }

    to {
      width: 100%;
    }
  }
</style>
