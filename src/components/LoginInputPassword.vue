<script setup lang="ts">
  import { KeyIcon } from '@heroicons/vue/24/outline'
  import { ref } from 'vue'

  const emit = defineEmits<{
    (e: 'password', password: string): void
  }>()

  const password = ref<string>('')

  function emitData() {
    emit('password', password.value)
  }
</script>

<template>
  <div class="flex w-full items-center justify-start gap-2">
    <KeyIcon class="w-6 text-violet-600" />
    <input
      class="w-full border-b-2 border-violet-600 bg-transparent pl-[2px] pb-1 text-sm text-zinc-900 placeholder:text-neutral-700 dark:text-zinc-100 dark:placeholder:text-neutral-400"
      type="password"
      placeholder="********"
      autocomplete="current-password"
      v-model.trim="password"
      @input="emitData"
    />
  </div>
</template>
