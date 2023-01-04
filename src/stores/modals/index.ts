import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useModals = defineStore('modals', () => {
  class Modal {
    status: boolean = false

    toogleModal() {
      this.status = !this.status
    }
  }

  const addTransactionModal = ref(new Modal())
  const editTransactionModal = ref(new Modal())
  const addCategoryModal = ref(new Modal())
  const deleteCategoryModal = ref(new Modal())
  const addBudgetModal = ref(new Modal())
  const editBudgetModal = ref(new Modal())
  const logoutModal = ref(new Modal())

  class Tooltip extends Modal {
    toogleTooltip() {
      this.status = !this.status
      setTimeout(() => (this.status = !this.status), 3500)
    }
  }

  const addedTooltip = ref(new Tooltip())

  return {
    addTransactionModal,
    editTransactionModal,
    addCategoryModal,
    deleteCategoryModal,
    addBudgetModal,
    editBudgetModal,
    logoutModal,
    addedTooltip
  }
})
