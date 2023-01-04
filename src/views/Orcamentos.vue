<script setup lang="ts">
  import { ArrowTrendingDownIcon, PlusIcon } from '@heroicons/vue/24/outline'
  import AppHeader from '../components/AppHeader.vue'
  import BudgetItem from '../components/BudgetItem.vue'
  import { useBudgets } from '../stores/budgets'
  import { useModals } from '../stores/modals'
  import { useTransactions } from '../stores/transactions'

  const budgetsStore = useBudgets()
  const modalsStore = useModals()
  const transactionsStore = useTransactions()

  function openAddBudgetModal() {
    transactionsStore.transactionType = 'expense'
    modalsStore.addBudgetModal.toogleModal()
  }
</script>

<template>
  <main
    class="flex min-h-screen w-full flex-col items-center justify-start gap-5 px-4 py-6 pb-[100px] lg:px-[100px] lg:pb-0"
  >
    <AppHeader />
    <section class="flex min-w-full flex-col items-start justify-center gap-6">
      <div
        class="text-zinc-90 grid w-full items-stretch gap-4 pb-3 dark:text-zinc-100"
      >
        <div
          class="flex items-center justify-between gap-4 rounded-xl bg-shark-100 px-8 py-6 dark:bg-shark-900"
        >
          <div class="flex flex-col gap-1">
            <h4 class="font-semibold">Em geral, você gastou cerca de</h4>
            <h1 class="font-bold">
              {{
                transactionsStore.getExpenseBalanceString(
                  transactionsStore.transactions
                )
              }}
            </h1>
          </div>
          <ArrowTrendingDownIcon class="w-10" />
        </div>
      </div>

      <div class="flex w-full flex-col gap-4">
        <h2 class="font-semibold text-zinc-900 dark:text-zinc-100">
          Orçamentos ativos
        </h2>
        <ul class="grid w-full cursor-pointer gap-6 lg:grid-cols-2">
          <BudgetItem
            class="bg-shark-100"
            v-for="(budget, index) in budgetsStore.budgets"
            :key="index"
            :budget="budget"
          />
          <li
            class="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border-2 border-dashed border-zinc-600 bg-opacity-75 px-4 py-6 text-zinc-600 dark:border-zinc-400 dark:text-zinc-400"
            @click="openAddBudgetModal"
          >
            Novo Orçamento
            <PlusIcon class="w-5" />
          </li>
        </ul>
      </div>
    </section>
  </main>
</template>
