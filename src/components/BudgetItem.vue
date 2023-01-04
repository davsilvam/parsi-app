<script setup lang="ts">
  import {
    CheckCircleIcon,
    ChevronRightIcon,
    ExclamationCircleIcon
  } from '@heroicons/vue/24/outline'
  import { BudgetType, useBudgets } from '../stores/budgets'

  const prop = defineProps<{ budget: BudgetType }>()

  const budgetsStore = useBudgets()

  function editBudget() {
    budgetsStore.budgetActions.editBudget(prop.budget)
  }
</script>

<template>
  <li
    class="flex w-full cursor-pointer items-center justify-between rounded-md bg-shark-200 px-4 py-6 text-zinc-800 shadow-md transition-colors hover:bg-shark-200 dark:bg-shark-700 dark:text-zinc-200 dark:hover:bg-shark-600"
    @click="editBudget"
  >
    <div class="flex items-center gap-3">
      <ExclamationCircleIcon
        v-if="budget.currentValue > budget.maxValue"
        class="w-8 text-red-500"
      />
      <CheckCircleIcon v-else class="w-8 text-green-500" />
      <div>
        <p
          class="small font-medium capitalize text-zinc-600 dark:text-zinc-400"
        >
          {{ `${budget.initialDate} &rsaquo; ${budget.finishDate}` }}
        </p>
        <h4 class="font-semibold">{{ budget.category }}</h4>
      </div>
    </div>
    <div class="flex items-center gap-2">
      <h3 class="font-semibold">
        {{ `R$ ${budget.currentValue}/${budget.maxValue}` }}
      </h3>
      <ChevronRightIcon class="w-5" />
    </div>
  </li>
</template>
