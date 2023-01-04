<script setup lang="ts">
  defineProps<{ value: string; disabled: boolean }>()
</script>

<template>
  <input
    class="button-primary"
    type="submit"
    :value="value"
    :class="[
      disabled
        ? 'not-allowed'
        : 'border-violet-600 bg-violet-600 text-zinc-100 hover:border-violet-700 hover:bg-violet-700'
    ]"
  />
</template>
