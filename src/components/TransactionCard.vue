<script setup lang="ts">
  import {
    ArrowTrendingDownIcon,
    ArrowTrendingUpIcon,
    ChevronRightIcon
  } from '@heroicons/vue/24/outline'
  import { TransactionType, useTransactions } from '../stores/transactions'

  defineProps<{ transaction: TransactionType }>()

  const transactionsStore = useTransactions()
</script>

<template>
  <div
    class="flex cursor-pointer items-center justify-between rounded-lg bg-shark-100 p-3 shadow-md transition-colors hover:bg-shark-200 dark:bg-shark-700 dark:hover:bg-shark-600"
  >
    <div class="flex items-center gap-3">
      <div
        class="grid h-10 w-10 place-items-center rounded-full"
        :class="[transaction.value < 0 ? 'bg-red-500' : 'bg-green-500']"
      >
        <ArrowTrendingUpIcon
          v-if="transaction.value > 0"
          class="w-5 text-green-900"
        />
        <ArrowTrendingDownIcon v-else class="w-5 text-red-900" />
      </div>
      <div class="flex flex-col items-start justify-center text-left">
        <h4
          class="w-32 overflow-hidden whitespace-nowrap text-zinc-900 dark:text-zinc-100 max-md:text-base lg:w-40"
        >
          {{ transaction.title }}
        </h4>
        <p
          class="text-[10px] font-semibold"
          :class="[transaction.value < 0 ? 'text-red-500' : 'text-green-500']"
        >
          {{ transaction.category }}
        </p>
      </div>
    </div>
    <div class="flex items-center gap-2">
      <div class="flex flex-col items-end">
        <p class="text-[10px] capitalize text-zinc-700 dark:text-zinc-400">
          {{
            transaction.date.toLocaleDateString('pt-BR', {
              weekday: 'long',
              month: 'numeric',
              day: 'numeric'
            })
          }}
        </p>
        <h2
          :class="[
            transaction.value < 0
              ? 'text-red-600 dark:text-red-500'
              : 'text-green-600 dark:text-green-500',
            'font-semibold max-md:text-base'
          ]"
        >
          {{
            (transaction.value > 0 ? '+ ' : '') +
            transactionsStore.getTransactionValueString(transaction.value)
          }}
        </h2>
      </div>
      <ChevronRightIcon
        class="w-5 text-zinc-900 dark:text-zinc-100 max-md:hidden"
      />
    </div>
  </div>
</template>
