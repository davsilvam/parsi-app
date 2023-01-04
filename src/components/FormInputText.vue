<script setup lang="ts">
  import { ref } from 'vue'

  const prop = defineProps<{ title: string }>()
  const emit = defineEmits<{
    (e: 'title', title: string): void
  }>()

  const inputTitle = ref<string>(prop.title)

  function emitTitleValue() {
    emit('title', inputTitle.value)
  }
</script>

<template>
  <input
    class="w-full border-b border-violet-600 bg-transparent pb-2 text-zinc-900 dark:text-zinc-100"
    type="text"
    id="title"
    v-model.trim="inputTitle"
    @input="emitTitleValue"
  />
</template>
