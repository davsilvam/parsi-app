import { defineStore } from 'pinia'
import { ref } from 'vue'

export type CategoryType = {
  id?: string
  name: string
  type: 'income' | 'expense' | null
}

export const useCategories = defineStore('categories', () => {
  let defaultCategories = ref<CategoryType[]>([
    { name: 'Alimentação', type: 'expense' },
    { name: 'Investimento', type: 'expense' },
    { name: 'Lazer', type: 'expense' },
    { name: 'Moradia', type: 'expense' },
    { name: 'Saúde', type: 'expense' },
    { name: 'Transporte', type: 'expense' },
    { name: 'Dividendos', type: 'income' },
    { name: 'Presente', type: 'income' },
    { name: 'Salário', type: 'income' },
    { name: 'Venda', type: 'income' }
  ])

  const categories = ref<CategoryType[]>([])
  const currentCategoryEditingId = ref<string>()

  const filterCategoriesByType = (type: 'income' | 'expense') => {
    const filteredCategory = categories.value.filter(
      (category) => category.type == type
    )
    return filteredCategory
  }

  return {
    defaultCategories,
    categories,
    currentCategoryEditingId,
    filterCategoriesByType
  }
})
