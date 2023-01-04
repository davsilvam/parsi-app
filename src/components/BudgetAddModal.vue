<script setup lang="ts">
  import { BanknotesIcon, XMarkIcon } from '@heroicons/vue/24/outline'
  import { ref, watchEffect } from 'vue'
  import { BudgetType, useBudgets } from '../stores/budgets'
  import { useModals } from '../stores/modals'
  import InputNumber from './FormInputNumber.vue'
  import InputSelect from './FormInputSelect.vue'
  import InputSubmitButton from './FormInputSubmitButton.vue'

  const budgetsStore = useBudgets()
  const modalsStore = useModals()

  const disabled = ref(true)

  const addingBudget = ref<BudgetType>(budgetsStore.budgetActions.defaultBudget)

  function handleInputNumberValue(data: number) {
    addingBudget.value.maxValue = data
  }

  function handleInputSelectValue(data: string) {
    addingBudget.value.category = data
  }

  function fieldsAreFilled() {
    return addingBudget.value.maxValue && addingBudget.value.category
  }

  function handleSubmitButtonSituation() {
    fieldsAreFilled() ? (disabled.value = false) : (disabled.value = true)
  }

  watchEffect(() => handleSubmitButtonSituation())

  function checkForm() {
    if (fieldsAreFilled()) {
      return submitBudget()
    }

    alert('Preencha todos os campos, por favor!')
  }

  function submitBudget() {
    budgetsStore.budgetActions.postBudget(addingBudget.value)
    closeBudgetModal()
  }

  function closeBudgetModal() {
    modalsStore.addBudgetModal.toogleModal()
    budgetsStore.budgetActions.clearBudget()
  }
</script>

<template>
  <div class="modal-black" @click.self="closeBudgetModal()">
    <div class="modal h-[450px]">
      <form
        class="flex h-full w-full flex-col items-center justify-between"
        @submit.prevent="checkForm"
      >
        <div class="flex w-full flex-col items-start gap-4">
          <header
            class="flex w-full items-start justify-between bg-shark-100 px-6 py-4 dark:bg-shark-900"
          >
            <div class="flex items-center gap-3">
              <div class="rounded-full bg-violet-400 p-2 text-violet-900">
                <BanknotesIcon class="w-5" />
              </div>
              <div class="flex flex-col">
                <h4
                  class="flex items-center gap-2 text-zinc-900 dark:text-zinc-100"
                >
                  Novo Orçamento
                </h4>
                <p class="small text-zinc-600 dark:text-zinc-400">
                  Crie um novo orçamento.
                </p>
              </div>
            </div>
            <div
              class="cursor-pointer rounded-md border border-zinc-600 p-1 dark:border-zinc-400"
              @click="closeBudgetModal()"
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
            <div class="flex flex-col gap-2">
              <h4 class="text-base text-zinc-900 dark:text-zinc-200">
                Categoria
              </h4>
              <InputSelect
                :selectMessage="'Selecionar categoria'"
                @category="handleInputSelectValue"
              />
            </div>
          </div>
        </div>

        <div class="w-full px-6 pb-4">
          <InputSubmitButton :value="'Registrar'" :disabled="disabled" />
        </div>
      </form>
    </div>
  </div>
</template>
