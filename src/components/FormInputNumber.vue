<script setup lang="ts">
  import { ref } from 'vue'

  const prop = defineProps<{ value: number | null }>()
  const emit = defineEmits<{
    (e: 'value', value: number): void
  }>()

  const inputValue = ref<number | null>(prop.value)

  function emitNumberValue() {
    emit('value', inputValue.value)
  }
</script>

<template>
  <div
    class="hover-ring mb-1 flex items-center gap-1 rounded-lg bg-shark-100 px-3 py-4 text-lg shadow-md dark:bg-shark-700"
    :class="[inputValue ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-600']"
  >
    R$
    <input
      class="w-full bg-transparent text-zinc-900 placeholder:text-zinc-600 dark:text-zinc-100"
      type="number"
      min="1"
      step=".01"
      placeholder="00.00"
      v-model.number="inputValue"
      @input="emitNumberValue"
    />
  </div>
</template>
