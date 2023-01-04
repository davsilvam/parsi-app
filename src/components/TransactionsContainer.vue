<script setup lang="ts">
  import { vAutoAnimate } from '@formkit/auto-animate'
  import creditCard from '../assets/imgs/credit_card.svg'
  import { TransactionType, useTransactions } from '../stores/transactions'
  import TransactionCard from './TransactionCard.vue'

  defineProps<{ transactionsArray: TransactionType[] }>()

  const transactionsStore = useTransactions()

  function editTransaction(transaction: TransactionType) {
    transactionsStore.transactionActions.editTransaction(transaction)
  }
</script>

<template>
  <section
    class="flex w-full flex-col items-start justify-center gap-4 rounded-2xl px-2 text-center"
  >
    <header class="flex w-full items-center justify-between">
      <slot />
    </header>

    <div
      class="flex w-full flex-col items-center justify-center gap-4 pt-5"
      v-if="transactionsArray.length === 0"
    >
      <img
        class="w-1/2 max-w-[200px]"
        :src="creditCard"
        alt="No transactions illustration image."
      />
      <p class="font-semibold text-zinc-700 dark:text-zinc-500">
        Sem transações recentes.
      </p>
    </div>

    <div
      class="flex w-full flex-col-reverse gap-2"
      id="transactions_container"
      v-auto-animate
    >
      <TransactionCard
        v-for="transaction in transactionsArray"
        :key="transaction.id"
        :transaction="transaction"
        @click="editTransaction(transaction)"
      />
    </div>
  </section>
</template>
