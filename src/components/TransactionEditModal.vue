<script setup lang="ts">
  import { PencilSquareIcon, XMarkIcon } from '@heroicons/vue/24/outline'
  import { ref, watchEffect } from 'vue'
  import { useModals } from '../stores/modals'
  import { TransactionType, useTransactions } from '../stores/transactions'
  import InputNumber from './FormInputNumber.vue'
  import InputSelect from './FormInputSelect.vue'
  import InputSubmitButton from './FormInputSubmitButton.vue'
  import InputText from './FormInputText.vue'

  const modalsStore = useModals()
  const transactionsStore = useTransactions()

  const disabled = ref<boolean>(true)

  const editingTransaction = ref<TransactionType>(
    transactionsStore.transactionActions.currentTransactionEditing
  )

  function handleInputNumberValue(data: number) {
    editingTransaction.value.value = data
  }

  function handleInputTextValue(data: string) {
    editingTransaction.value.title = data
  }

  function handleInputSelectValue(data: string) {
    editingTransaction.value.category = data
  }

  function fieldsAreFilled() {
    return (
      editingTransaction.value.category &&
      editingTransaction.value.title &&
      editingTransaction.value.value
    )
  }

  function handleSubmitButtonSituation() {
    fieldsAreFilled() ? (disabled.value = false) : (disabled.value = true)
  }

  watchEffect(() => handleSubmitButtonSituation())

  function checkForm() {
    fieldsAreFilled()
      ? submitChanges()
      : alert('Preencha todos os campos, por favor!')
  }

  function submitChanges() {
    if (editingTransaction.value.type === 'expense') {
      editingTransaction.value.value *= -1
    }

    const transaction = ref(editingTransaction.value)

    transactionsStore.transactionActions.updateTransaction(transaction.value)
  }

  function deleteTransaction() {
    transactionsStore.transactionActions.deleteTransaction(
      editingTransaction.value.id
    )
    closeEditTransactionModal()
  }

  function closeEditTransactionModal() {
    modalsStore.editTransactionModal.toogleModal()
    transactionsStore.transactionActions.clearTransaction()
  }
</script>

<template>
  <div class="modal-black" @click.self="closeEditTransactionModal">
    <div class="modal">
      <form
        class="flex h-full w-full flex-col items-center justify-between"
        @submit.prevent=""
      >
        <div class="flex w-full flex-col items-start gap-4">
          <header
            class="flex w-full items-center justify-between bg-shark-100 px-6 py-4 dark:bg-shark-900"
          >
            <div class="flex items-center gap-3">
              <div class="rounded-full bg-amber-400 p-2 text-amber-900">
                <PencilSquareIcon class="w-5" />
              </div>
              <div class="flex flex-col">
                <h4
                  class="flex items-center gap-2 text-zinc-900 dark:text-zinc-100"
                >
                  Editar transação
                </h4>
                <p class="small text-zinc-600 dark:text-zinc-400">
                  Modifique os dados de uma transação.
                </p>
              </div>
            </div>
            <div
              class="cursor-pointer rounded-md border border-zinc-600 p-1 dark:border-zinc-400"
              @click="closeEditTransactionModal"
            >
              <XMarkIcon class="w-4 text-zinc-600 dark:text-zinc-400" />
            </div>
          </header>
          <div class="flex w-full flex-col gap-4 px-6">
            <InputNumber
              :value="editingTransaction.value"
              @value="handleInputNumberValue"
            />
            <div class="flex w-full flex-col gap-2">
              <label
                class="text-base text-zinc-900 dark:text-zinc-200"
                for="title"
                >Título</label
              >
              <InputText
                :title="editingTransaction.title"
                @title="handleInputTextValue"
              />
            </div>
            <div class="flex w-full flex-col gap-2">
              <label
                class="text-base text-zinc-900 dark:text-zinc-200"
                for="category"
                >Conta</label
              >
              <InputSelect
                :selectMessage="editingTransaction.category"
                @category="handleInputSelectValue"
              />
            </div>
          </div>
        </div>

        <div class="flex w-full items-center gap-4 px-6 pb-4">
          <button class="danger-button" @click.self="deleteTransaction">
            Deletar
          </button>

          <InputSubmitButton
            :value="'Atualizar'"
            :disabled="disabled"
            @click="checkForm"
          />
        </div>
      </form>
    </div>
  </div>
</template>
