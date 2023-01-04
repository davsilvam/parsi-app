<script setup lang="ts">
  import {
    ArrowSmallLeftIcon,
    ArrowSmallRightIcon,
    ArrowsRightLeftIcon,
    ArrowTrendingDownIcon,
    ArrowTrendingUpIcon,
    CheckIcon,
    XMarkIcon
  } from '@heroicons/vue/24/outline'
  import { computed, ref, watchEffect } from 'vue'
  import { useModals } from '../stores/modals'
  import {
    TransactionAddingType,
    useTransactions
  } from '../stores/transactions'
  import InputNumber from './FormInputNumber.vue'
  import InputSelect from './FormInputSelect.vue'
  import InputSubmitButton from './FormInputSubmitButton.vue'
  import InputText from './FormInputText.vue'

  const modalsStore = useModals()
  const transactionsStore = useTransactions()

  const addingTransaction = ref<TransactionAddingType>(
    transactionsStore.transactionActions.defaultTransaction
  )

  transactionsStore.transactionType = computed(
    () => addingTransaction.value.type
  )

  const disabled = ref<boolean>(true)
  const nextStep = ref<boolean>(false)

  function goToTheNextStep() {
    nextStep.value = true
  }

  function handleInputTextValue(data: string) {
    addingTransaction.value.title = data
  }

  function handleInputSelectValue(data: string) {
    addingTransaction.value.category = data
  }

  function handleInputNumberValue(data: number) {
    addingTransaction.value.value = data
  }

  function fieldsAreFilled() {
    return (
      addingTransaction.value.title &&
      addingTransaction.value.type &&
      addingTransaction.value.category &&
      addingTransaction.value.value
    )
  }

  function handleSubmitButtonSituation() {
    fieldsAreFilled() ? (disabled.value = false) : (disabled.value = true)
  }

  watchEffect(() => handleSubmitButtonSituation())

  function checkForm() {
    fieldsAreFilled()
      ? goToTheNextStep()
      : alert('Preencha todos os campos, por favor!')
  }

  function submitTransaction() {
    if (transactionsStore.transactionType === 'expense') {
      addingTransaction.value.value *= -1
    }

    addingTransaction.value.date = Date.now()
    const transaction = ref(addingTransaction.value)

    transactionsStore.transactionActions.postTransaction(transaction.value)
    modalsStore.addedTooltip.toogleTooltip()

    closeTransactionModal()
  }

  function closeTransactionModal() {
    modalsStore.addTransactionModal.toogleModal()
    transactionsStore.transactionActions.clearTransaction()
  }
</script>

<template>
  <div class="modal-black" @click.self="closeTransactionModal">
    <div class="modal">
      <form
        v-if="!nextStep"
        class="flex h-full w-full flex-col items-center justify-between"
        @submit.prevent="checkForm"
      >
        <div class="flex w-full flex-col items-start gap-4">
          <header
            class="flex w-full items-center justify-between bg-shark-100 px-6 py-4 dark:bg-shark-900"
          >
            <div class="flex items-center gap-3">
              <div class="rounded-full bg-violet-400 p-2 text-violet-900">
                <ArrowsRightLeftIcon class="w-5" />
              </div>
              <div class="flex flex-col">
                <h4
                  class="flex items-center gap-2 text-zinc-900 dark:text-zinc-100"
                >
                  Registrar Transação
                </h4>
                <p class="small text-zinc-600 dark:text-zinc-400">
                  Registre uma nova transação.
                </p>
              </div>
            </div>
            <div
              class="cursor-pointer rounded-md border border-zinc-600 p-1 dark:border-zinc-400"
              @click="closeTransactionModal"
            >
              <XMarkIcon class="w-4 text-zinc-600 dark:text-zinc-400" />
            </div>
          </header>
          <div class="flex w-full flex-col gap-4 px-6">
            <InputNumber
              :value="addingTransaction.value"
              @value="handleInputNumberValue"
            />
            <div class="grid w-full grid-cols-5 gap-5">
              <div class="col-span-3 flex w-full flex-col gap-2">
                <label
                  class="cursor-pointer text-base text-zinc-900 dark:text-zinc-200"
                  for="title"
                >
                  Título
                </label>
                <InputText
                  :title="addingTransaction.title"
                  @title="handleInputTextValue"
                />
              </div>
              <div class="col-span-2 flex flex-col gap-2 backdrop:w-full">
                <label
                  class="cursor-pointer text-base text-zinc-900 dark:text-zinc-200"
                  for="type"
                >
                  Tipo
                </label>
                <input
                  id="income"
                  class="hidden"
                  type="radio"
                  value="income"
                  v-model="addingTransaction.type"
                />
                <input
                  id="expense"
                  class="hidden"
                  type="radio"
                  value="expense"
                  v-model="addingTransaction.type"
                />
                <div class="text-base text-zinc-900 dark:text-zinc-100">
                  <div
                    class="hover-ring flex items-center justify-between rounded-md bg-shark-100 dark:bg-shark-700"
                  >
                    <label
                      for="income"
                      class="h-full w-full cursor-pointer rounded-md px-4 py-2 text-sm transition-colors"
                      :class="{
                        'bg-green-500 shadow-md':
                          addingTransaction.type === 'income'
                      }"
                    >
                      <span class="hidden lg:block">Ganho</span>
                      <ArrowTrendingUpIcon class="w-5 lg:hidden" />
                    </label>
                    <label
                      for="expense"
                      class="h-full w-full cursor-pointer rounded-md px-4 py-2 text-sm transition-colors"
                      :class="{
                        'bg-red-500': addingTransaction.type === 'expense'
                      }"
                    >
                      <span class="hidden lg:block">Despesa</span>
                      <ArrowTrendingDownIcon class="w-5 lg:hidden" />
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex w-full flex-col gap-2">
              <label
                class="text-base text-zinc-900 dark:text-zinc-200"
                for="category"
                >Categoria</label
              >
              <InputSelect
                :selectMessage="
                  addingTransaction.category || 'Selecionar categoria'
                "
                @category="handleInputSelectValue"
              />
            </div>
          </div>
        </div>

        <div class="w-full px-6 pb-4">
          <button
            class="button-primary"
            :class="[
              disabled
                ? 'not-allowed'
                : 'border-violet-600 bg-violet-600 text-zinc-100 hover:border-violet-700 hover:bg-violet-700'
            ]"
          >
            <div></div>
            Avançar
            <ArrowSmallRightIcon class="w-5" />
          </button>
        </div>
      </form>

      <form
        v-else
        class="flex h-full w-full flex-col items-center justify-between"
        @submit.prevent=""
      >
        <div class="flex w-full flex-col items-start gap-4">
          <header
            class="flex w-full items-center justify-between bg-shark-100 px-6 py-4 dark:bg-shark-900"
          >
            <div class="flex items-center gap-3">
              <div class="rounded-full bg-violet-400 p-2 text-violet-900">
                <CheckIcon class="w-5" />
              </div>
              <div class="flex flex-col">
                <h4
                  class="flex items-center gap-2 text-zinc-900 dark:text-zinc-100"
                >
                  Confirmar transação
                </h4>
                <p class="small text-zinc-400">
                  Verifique os dados e confirme a transação.
                </p>
              </div>
            </div>
            <div
              class="cursor-pointer rounded-md border border-zinc-600 p-1 dark:border-zinc-400"
              @click="closeTransactionModal"
            >
              <XMarkIcon class="w-4 text-zinc-600 dark:text-zinc-400" />
            </div>
          </header>
          <div class="grid w-full grid-cols-4 gap-4 px-6">
            <p
              class="col-span-1 font-semibold text-zinc-600 dark:text-zinc-400"
            >
              Título
            </p>
            <p
              class="col-span-3 font-semibold text-zinc-800 dark:text-zinc-200"
            >
              {{ addingTransaction.title }}
            </p>
            <hr class="col-span-4 border-zinc-200 dark:border-shark-700" />
            <p
              class="col-span-1 font-semibold text-zinc-600 dark:text-zinc-400"
            >
              Valor
            </p>
            <p
              class="col-span-3 font-semibold text-zinc-800 dark:text-zinc-200"
            >
              {{
                (addingTransaction.type === 'income' ? 'R$ ' : '- R$ ') +
                addingTransaction.value.toFixed(2)
              }}
            </p>
            <hr class="col-span-4 border-zinc-200 dark:border-shark-700" />
            <p
              class="col-span-1 font-semibold text-zinc-600 dark:text-zinc-400"
            >
              Tipo
            </p>
            <p
              class="col-span-3 font-semibold"
              :class="[
                addingTransaction.type === 'income'
                  ? 'text-green-500'
                  : 'text-red-500'
              ]"
            >
              {{ addingTransaction.type === 'income' ? 'Ganho' : 'Despesa' }}
            </p>
            <hr class="col-span-4 border-zinc-200 dark:border-shark-700" />
            <p
              class="col-span-1 font-semibold text-zinc-600 dark:text-zinc-400"
            >
              Categoria
            </p>
            <p
              class="col-span-3 font-semibold text-zinc-800 dark:text-zinc-200"
            >
              {{ addingTransaction.category }}
            </p>
          </div>
        </div>

        <div class="flex w-full items-center gap-4 px-6 pb-4">
          <button
            class="button-primary border-zinc-800 text-zinc-900 dark:border-zinc-200 dark:text-zinc-100 dark:hover:border-zinc-400 dark:hover:text-zinc-400"
            @click="nextStep = false"
          >
            <ArrowSmallLeftIcon class="w-5" />
            Voltar
            <div></div>
          </button>
          <InputSubmitButton
            @click="submitTransaction"
            :value="'Enviar'"
            :disabled="disabled"
          />
        </div>
      </form>
    </div>
  </div>
</template>
