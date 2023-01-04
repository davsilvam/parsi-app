<script setup lang="ts">
  import { BanknotesIcon, XMarkIcon } from '@heroicons/vue/24/outline'
  import { ref, watchEffect } from 'vue'
  import { BudgetType, useBudgets } from '../stores/budgets'
  import { useModals } from '../stores/modals'
  import InputNumber from './FormInputNumber.vue'
  import InputSubmitButton from './FormInputSubmitButton.vue'

  const budgetsStore = useBudgets()
  const modalsStore = useModals()

  const disabled = ref<boolean>(true)

  const addingBudget = ref<BudgetType>(
    budgetsStore.budgetActions.currentBudgetEditing
  )

  function handleInputNumberValue(data: number) {
    addingBudget.value.maxValue = data
  }

  function fieldsAreFilled() {
    return addingBudget.value.maxValue
  }

  function handleSubmitButtonSituation() {
    fieldsAreFilled() ? (disabled.value = false) : (disabled.value = true)
  }

  watchEffect(() => handleSubmitButtonSituation())

  function checkForm() {
    if (fieldsAreFilled()) {
      return submitBudgetChange()
    }

    alert('Preencha todos os campos, por favor!')
  }

  function submitBudgetChange() {
    budgetsStore.budgetActions.updateBudget(addingBudget.value)
    closeEditBudgetModal()
  }

  function deleteBudget() {
    budgetsStore.budgetActions.deleteBudget(addingBudget.value.id)
    closeEditBudgetModal()
  }

  function closeEditBudgetModal() {
    modalsStore.editBudgetModal.toogleModal()
    budgetsStore.budgetActions.clearBudget()
  }
</script>

<template>
  <div class="modal-black" @click.self="closeEditBudgetModal">
    <div class="modal h-[300px]">
      <form
        class="flex h-full w-full flex-col items-center justify-between"
        @submit.prevent=""
      >
        <div class="flex w-full flex-col items-start gap-4">
          <header
            class="flex w-full items-start justify-between bg-shark-100 px-6 py-4 dark:bg-shark-900"
          >
            <div class="flex items-center gap-3">
              <div class="rounded-full bg-amber-400 p-2 text-amber-900">
                <BanknotesIcon class="w-5" />
              </div>
              <div class="flex flex-col">
                <h4
                  class="flex items-center gap-2 text-zinc-900 dark:text-zinc-100"
                >
                  Editar Orçamento
                </h4>
                <p class="small text-zinc-600 dark:text-zinc-400">
                  Altere o valor máximo do orçamento.
                </p>
              </div>
            </div>
            <div
              class="cursor-pointer rounded-md border border-zinc-600 p-1 dark:border-zinc-400"
              @click="closeEditBudgetModal"
            >
              <XMarkIcon class="w-4 text-zinc-600 dark:text-zinc-400" />
            </div>
          </header>
          <div class="flex w-full flex-col gap-4 px-6">
            <div class="flex flex-col gap-2">
              <h4 class="text-base text-zinc-900 dark:text-zinc-200">
                Valor Máximo
              </h4>
              <InputNumber
                :value="addingBudget.maxValue"
                @value="handleInputNumberValue"
              />
            </div>
          </div>
        </div>

        <div class="flex w-full items-center gap-4 px-6 pb-4">
          <button class="danger-button" @click="deleteBudget">Deletar</button>

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
