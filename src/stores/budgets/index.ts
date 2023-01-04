import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useModals } from '../modals'
import { useUser } from '../user'

export type BudgetType = {
  id?: string
  category: string
  maxValue: number
  currentValue: number
  initialDate: string
  finishDate: string
}

export const useBudgets = defineStore('budgets', () => {
  const modalsStore = useModals()
  const userStore = useUser()

  class Budget {
    defaultBudget: BudgetType = {
      category: null,
      maxValue: null,
      currentValue: null,
      initialDate: null,
      finishDate: null
    }

    currentBudgetEditing: BudgetType = {
      category: null,
      maxValue: null,
      currentValue: null,
      initialDate: null,
      finishDate: null
    }

    clearBudget() {
      this.defaultBudget = {
        category: null,
        maxValue: null,
        currentValue: null,
        initialDate: null,
        finishDate: null
      }
    }

    postBudget(data: BudgetType) {
      const budget = data
      budget.currentValue = 0
      userStore.postBudgetUser(budget)
    }

    editBudget(data: BudgetType) {
      this.currentBudgetEditing = data
      modalsStore.editBudgetModal.toogleModal()
    }

    updateBudget(data: BudgetType) {
      userStore.updateBudgetUser(data, data.id)
    }

    deleteBudget(id: string) {
      userStore.deleteBudgetUser(id)
    }
  }

  const budgetActions = new Budget()
  const budgets = ref([])

  return {
    budgetActions,
    budgets
  }
})
