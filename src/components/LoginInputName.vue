<script setup lang="ts">
  import { IdentificationIcon } from '@heroicons/vue/24/outline'
  import { ref } from 'vue'

  const emit = defineEmits<{
    (e: 'name', name: string): void
  }>()

  const name = ref<string>('')

  function emitData() {
    emit('name', name.value)
  }
</script>

<template>
  <div class="flex w-full items-center justify-start gap-2">
    <IdentificationIcon class="w-6 text-violet-600" />
    <input
      class="w-full border-b-2 border-violet-600 bg-transparent pl-[2px] pb-1 text-sm text-zinc-900 placeholder:text-neutral-700 dark:text-zinc-100 dark:placeholder:text-neutral-400"
      type="text"
      placeholder="Primeiro nome"
      v-model.trim="name"
      @input="emitData"
    />
  </div>
</template>
