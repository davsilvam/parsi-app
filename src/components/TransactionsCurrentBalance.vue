<script setup lang="ts">
  import { PlusIcon } from '@heroicons/vue/24/outline'
  import { useModals } from '../stores/modals'
  import { useTransactions } from '../stores/transactions'

  const transactionsStore = useTransactions()
  const modalsStore = useModals()
</script>

<template>
  <section
    class="relative flex w-full items-center justify-between rounded-xl bg-violet-600 p-8 text-zinc-100 lg:p-14"
  >
    <div class="z-10 w-full">
      <h4 class="font-semibold">Seu Saldo</h4>
      <h1 class="font-bold">
        {{
          transactionsStore.getCurrentBalanceString(
            transactionsStore.transactions
          ).value
        }}
      </h1>
    </div>
    <button
      class="z-10 rounded-full bg-zinc-800 p-3 ring-2 ring-zinc-100 transition-colors duration-300 hover:bg-violet-600"
      @click="modalsStore.addTransactionModal.toogleModal()"
    >
      <PlusIcon class="w-6" />
    </button>
    <svg
      class="absolute bottom-0 left-0 h-10 w-full rounded-b-xl lg:h-[80px]"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 24 150 28"
      preserveAspectRatio="none"
      shape-rendering="auto"
    >
      <defs>
        <path
          id="gentle-wave"
          d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
        />
      </defs>
      <g class="parallax">
        <use
          xlink:href="#gentle-wave"
          x="48"
          y="0"
          fill="rgb(109, 40, 217, 0.7)"
        />
        <use
          xlink:href="#gentle-wave"
          x="48"
          y="3"
          fill="rgb(109, 40, 217, 0.5)"
        />
        <use
          xlink:href="#gentle-wave"
          x="48"
          y="5"
          fill="rgb(109, 40, 217, 0.3)"
        />
        <use xlink:href="#gentle-wave" x="48" y="7" fill="rgb(109, 40, 217)" />
      </g>
    </svg>
  </section>
</template>

<style scoped>
  .parallax > use {
    animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
  }

  .parallax > use:nth-child(1) {
    animation-delay: -2s;
    animation-duration: 7s;
  }

  .parallax > use:nth-child(2) {
    animation-delay: -3s;
    animation-duration: 10s;
  }

  .parallax > use:nth-child(3) {
    animation-delay: -4s;
    animation-duration: 13s;
  }

  .parallax > use:nth-child(4) {
    animation-delay: -5s;
    animation-duration: 20s;
  }

  @keyframes move-forever {
    0% {
      transform: translate3d(-90px, 0, 0);
    }
    100% {
      transform: translate3d(85px, 0, 0);
    }
  }
</style>
