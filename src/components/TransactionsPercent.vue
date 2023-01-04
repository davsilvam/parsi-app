<script setup lang="ts">
  import {
    ArrowTrendingDownIcon,
    ArrowTrendingUpIcon
  } from '@heroicons/vue/24/outline'
  import noData from '../assets/imgs/no_data.svg'
  import ChartDoughnut from '../components/ChartDoughnut.vue'
  import { TransactionType, useTransactions } from '../stores/transactions'

  defineProps<{ transactionsArray: TransactionType[] | [] }>()

  const transactionsStore = useTransactions()
</script>

<template>
  <div
    class="flex w-full flex-col items-center gap-1 rounded-lg bg-shark-200 px-4 py-2 shadow-md dark:bg-shark-700 md:gap-3 md:py-8"
  >
    <h2 class="hidden font-semibold text-zinc-900 dark:text-zinc-100 md:block">
      Balanço Percentual
    </h2>

    <div
      class="flex w-full items-center justify-center md:flex-col md:gap-5 xl:flex-row"
      v-if="transactionsStore.transactions.length > 0"
    >
      <div class="flex w-1/3 items-center justify-center md:w-2/3">
        <ChartDoughnut
          class="max-h-[100px] w-full md:max-h-[180px]"
          :transactionsArray="transactionsStore.transactions"
        />
      </div>
      <div
        class="flex w-2/3 flex-col items-center justify-center gap-2 xl:w-1/3"
      >
        <h4
          class="hidden font-semibold text-zinc-900 dark:text-zinc-100 max-md:block"
        >
          Balanço Percentual
        </h4>
        <div
          class="flex w-full items-center justify-center gap-4 xl:w-1/3 xl:flex-col xl:justify-around"
        >
          <p
            class="flex items-center gap-2 font-bold text-zinc-900 dark:text-zinc-100 md:gap-1"
          >
            {{ transactionsStore.expensePercent + '%' }}
            <ArrowTrendingUpIcon class="w-5 text-red-500" />
          </p>
          <div
            class="h-5 w-px bg-zinc-300 dark:bg-shark-800 xl:h-px xl:w-24"
          ></div>
          <p
            class="flex items-center gap-2 font-bold text-zinc-900 dark:text-zinc-100 md:gap-1"
          >
            {{ transactionsStore.incomePercent + '%' }}
            <ArrowTrendingDownIcon class="w-5 text-green-500" />
          </p>
        </div>
      </div>
    </div>

    <div class="flex flex-col items-center gap-2" v-else>
      <img
        class="max-md:hidden md:max-w-[160px]"
        :src="noData"
        alt="No data illustration image."
      />
      <p class="text-zinc-600 dark:text-zinc-400">
        Adicione transações para checar os gráficos.
      </p>
    </div>
  </div>
</template>
