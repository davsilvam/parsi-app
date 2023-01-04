<script setup lang="ts">
  import { ArcElement, Chart, DoughnutController } from 'chart.js'
  import { computed } from 'vue'
  import { DoughnutChart } from 'vue-chart-3'
  import { TransactionType, useTransactions } from '../stores/transactions'

  const prop = defineProps<{ transactionsArray: TransactionType[] }>()

  const transactionsStore = useTransactions()

  Chart.register(DoughnutController, ArcElement)

  const data = computed(() => ({
    labels: ['Ganhos', 'Despesas'],

    datasets: [
      {
        data: transactionsStore.getTransactionsPercents(prop.transactionsArray),
        backgroundColor: ['#22c55e', '#ef4444']
      }
    ]
  })) as any
</script>

<template>
  <DoughnutChart :chart-data="data" />
</template>
