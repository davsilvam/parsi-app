<script setup lang="ts">
  import { AtSymbolIcon } from '@heroicons/vue/24/outline'
  import { ref } from 'vue'

  const emit = defineEmits<{
    (e: 'email', title: string): void
  }>()

  const email = ref<string>('')

  function emitData() {
    emit('email', email.value)
  }
</script>

<template>
  <div class="flex w-full items-center justify-start gap-2">
    <AtSymbolIcon class="w-6 text-violet-600" />
    <input
      class="w-full border-b-2 border-violet-600 bg-transparent pl-[2px] pb-1 text-sm text-zinc-900 placeholder:text-neutral-700 dark:text-zinc-100 dark:placeholder:text-neutral-400"
      type="email"
      placeholder="Endereço de email"
      autocomplete="email"
      v-model.trim="email"
      @input="emitData"
    />
  </div>
</template>
