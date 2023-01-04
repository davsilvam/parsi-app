<script setup lang="ts">
  import {
    ArrowsUpDownIcon,
    ArrowTrendingDownIcon,
    ArrowTrendingUpIcon
  } from '@heroicons/vue/24/outline'
  import { ref } from 'vue'
  import noData from '../assets/imgs/no_data.svg'
  import AppHeader from '../components/AppHeader.vue'
  import ChartDoughnut from '../components/ChartDoughnut.vue'
  import TransactionsContainer from '../components/TransactionsContainer.vue'
  import TransactionsMonthSelect from '../components/TransactionsMonthSelect.vue'
  import { TransactionType, useTransactions } from '../stores/transactions'

  const transactionsStore = useTransactions()

  const monthTransactions = ref<TransactionType[]>([])
  const currentMonth = ref<number>()

  function getMonth(data: number) {
    currentMonth.value = data
    getMonthTransactions()
  }

  function getMonthTransactions() {
    monthTransactions.value = transactionsStore.getMonthTransactions(
      String(Number(currentMonth.value) + 1)
    )
  }
</script>

<template>
  <main
    class="flex min-h-screen w-full flex-col items-center justify-start gap-5 px-4 py-6 pb-[100px] lg:px-24 lg:pb-0"
  >
    <AppHeader />
    <section class="flex min-w-full flex-col items-start justify-center gap-5">
      <div class="flex w-full flex-col items-center justify-center gap-5 pb-3">
        <div class="grid w-full grid-cols-2 gap-2 lg:grid-cols-3">
          <div
            class="col-span-2 flex w-full items-center justify-between gap-2 rounded-2xl bg-shark-100 px-6 py-4 dark:bg-shark-900 lg:col-span-1"
          >
            <div class="flex flex-col gap-1">
              <h3 class="text-sm text-zinc-800 dark:text-zinc-200">
                Faturamento
              </h3>
              <h1
                class="flex gap-2 font-semibold text-zinc-900 dark:text-zinc-200"
              >
                {{
                  transactionsStore.getCurrentBalanceString(monthTransactions)
                    .value
                }}
                <ArrowsUpDownIcon class="w-5 text-purple-600 lg:w-6" />
              </h1>
            </div>
          </div>
          <div
            class="flex w-full flex-col items-start justify-center gap-2 rounded-2xl bg-shark-100 px-6 py-4 dark:bg-shark-900"
          >
            <div class="flex flex-col gap-1">
              <h3 class="text-sm text-zinc-800 dark:text-zinc-200">Entradas</h3>
              <h2
                class="flex gap-2 font-semibold text-zinc-900 dark:text-zinc-200 max-sm:text-sm"
              >
                {{
                  transactionsStore.getIncomeBalanceString(monthTransactions)
                    .value
                }}
                <ArrowTrendingUpIcon class="w-5 text-green-600 lg:w-6" />
              </h2>
            </div>
          </div>
          <div
            class="flex w-full flex-col items-start justify-center gap-2 rounded-2xl bg-shark-100 px-6 py-4 dark:bg-shark-900"
          >
            <div class="flex flex-col gap-[2px]">
              <h3 class="text-sm text-zinc-800 dark:text-zinc-200">Saídas</h3>
              <h2
                class="flex gap-2 font-semibold text-zinc-900 dark:text-zinc-200 max-sm:text-sm"
              >
                {{
                  transactionsStore.getExpenseBalanceString(monthTransactions)
                }}
                <ArrowTrendingDownIcon class="w-5 text-red-600 lg:w-6" />
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div class="flex w-full items-start gap-8">
        <TransactionsContainer :transactionsArray="monthTransactions">
          <h2 class="font-semibold text-zinc-900 dark:text-zinc-100">
            Transações
          </h2>
          <TransactionsMonthSelect @currentMonth="getMonth" />
        </TransactionsContainer>

        <div
          class="flex w-1/3 flex-col items-center gap-3 rounded-md bg-shark-100 py-4 px-8 shadow-lg dark:bg-shark-700 max-md:hidden"
        >
          <h3 class="text-zinc-900 dark:text-zinc-100">Balanço Percentual</h3>
          <div
            class="flex w-full flex-col items-center gap-2"
            v-if="monthTransactions.length > 0"
          >
            <ChartDoughnut
              class="w-8/12"
              :transactionsArray="monthTransactions"
            />
            <div class="flex items-center justify-center gap-4 max-md:hidden">
              <p
                class="flex items-center gap-1 font-bold text-zinc-900 dark:text-zinc-100"
              >
                {{
                  transactionsStore.getTransactionsPercents(
                    monthTransactions
                  )[1] + '%'
                }}
                <ArrowTrendingUpIcon class="w-5 text-red-500" />
              </p>
              <div class="h-5 w-px bg-zinc-300 dark:bg-shark-800"></div>
              <p
                class="flex items-center gap-1 font-bold text-zinc-900 dark:text-zinc-100"
              >
                {{
                  transactionsStore.getTransactionsPercents(
                    monthTransactions
                  )[0] + '%'
                }}
                <ArrowTrendingDownIcon class="w-5 text-green-500" />
              </p>
            </div>
          </div>
          <div class="flex flex-col gap-2" v-else>
            <img
              class="max-md:hidden md:max-w-[160px]"
              :src="noData"
              alt="No data illustration image."
            />
            <p class="text-zinc-600 dark:text-zinc-400">Sem dados nesse mês.</p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
