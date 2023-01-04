<script setup lang="ts">
  import { ArrowRightIcon, BanknotesIcon } from '@heroicons/vue/24/outline'
  import { RouterLink } from 'vue-router'
  import AppHeader from '../components/AppHeader.vue'
  import BudgetItem from '../components/BudgetItem.vue'
  import TransactionsContainer from '../components/TransactionsContainer.vue'
  import TransactionsCurrentBalance from '../components/TransactionsCurrentBalance.vue'
  import TransactionsPercent from '../components/TransactionsPercent.vue'
  import { useBudgets } from '../stores/budgets'
  import { useTransactions } from '../stores/transactions'

  const budgetsStore = useBudgets()
  const transactionsStore = useTransactions()
</script>

<template>
  <main
    class="md:pb-60px relative flex min-h-screen w-full flex-col items-center justify-start gap-6 pb-[100px] lg:px-[100px]"
  >
    <div
      class="absolute top-0 h-[45vh] w-screen bg-shark-100 dark:bg-shark-900 max-md:hidden"
    ></div>
    <div
      class="z-10 flex w-full flex-col gap-5 py-6 max-lg:px-4 max-lg:pb-8 max-md:rounded-b-xl max-md:bg-shark-100 max-md:dark:bg-shark-900"
    >
      <AppHeader />
      <div
        class="flex w-full grid-cols-5 grid-rows-3 flex-col gap-4 md:grid md:items-stretch md:gap-y-4 md:gap-x-4 xl:gap-y-2"
      >
        <TransactionsCurrentBalance class="md:col-span-3 md:row-span-2" />
        <TransactionsPercent
          class="max-md:hidden md:col-span-2 md:row-span-3 md:flex"
          :transactionsArray="transactionsStore.transactions"
        />
        <BudgetItem
          v-if="budgetsStore.budgets.length > 0"
          class="max-md:hidden md:col-span-3"
          :budget="budgetsStore.budgets[0]"
        />
        <RouterLink
          to="/orcamentos"
          class="flex w-full items-center justify-between rounded-md bg-zinc-100 px-8 py-6 text-zinc-800 shadow-md dark:bg-shark-700 dark:text-zinc-200 max-md:hidden md:col-span-3"
          v-else
        >
          <div class="flex items-center gap-2">
            <h4>Adicione um orçamento e comece a salvar dinheiro!</h4>
            <BanknotesIcon class="w-5 max-md:hidden" />
          </div>
          <ArrowRightIcon class="w-6" />
        </RouterLink>
      </div>
    </div>
    <div class="flex w-full flex-col gap-6 max-lg:px-4">
      <TransactionsPercent
        :transactionsArray="[]"
        class="bg-shark-100 dark:bg-shark-900 md:hidden"
      />
      <TransactionsContainer
        :transactionsArray="transactionsStore.getLastThreeTransactions()"
      >
        <h2 class="font-semibold text-zinc-900 dark:text-zinc-100">
          Últimas Transações
        </h2>
        <RouterLink
          class="text-sm text-zinc-600 transition-colors hover:text-zinc-500 dark:text-zinc-400 dark:transition-colors dark:hover:text-zinc-500"
          to="/transacoes"
          >Ver todas</RouterLink
        >
      </TransactionsContainer>
    </div>
  </main>
</template>
