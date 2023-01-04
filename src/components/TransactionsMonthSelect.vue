<script setup lang="ts">
  import {
    CalendarIcon,
    ChevronLeftIcon,
    ChevronRightIcon
  } from '@heroicons/vue/24/outline'
  import { ref, watchEffect } from 'vue'

  const emit = defineEmits<{
    (e: 'currentMonth', month: number): void
  }>()

  const months: string[] = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ]

  const currentMonth = ref<number>(new Date().getMonth())

  watchEffect(() => {
    emit('currentMonth', currentMonth.value)
  })

  function goToTheNextMonth() {
    currentMonth.value++

    if (currentMonth.value > 11) {
      return (currentMonth.value = 0)
    }
  }

  function goToThePreviousMonth() {
    currentMonth.value--

    if (currentMonth.value < 0) {
      return (currentMonth.value = 11)
    }
  }
</script>

<template>
  <div class="flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
    <ChevronLeftIcon
      class="hover-colors w-4 cursor-pointer"
      @click="goToThePreviousMonth"
    />
    <CalendarIcon class="w-5 text-zinc-900 dark:text-zinc-100" />
    <h4 class="w-20">{{ months[currentMonth] }}</h4>
    <ChevronRightIcon
      class="hover-colors w-4 cursor-pointer"
      @click="goToTheNextMonth"
    />
  </div>
</template>
