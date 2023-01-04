import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useModals } from '../modals'
import { useUser } from '../user'

export type TransactionType = {
  id?: string
  title: string
  value: number
  type: 'income' | 'expense'
  category: string
  date?: Date
}

export type TransactionAddingType = {
  id?: string
  title: string
  value: number
  type: 'income' | 'expense'
  category: string
  date?: number
}

export const useTransactions = defineStore('transactions', () => {
  const userStore = useUser()
  const modalsStore = useModals()

  class Transaction {
    defaultTransaction: TransactionAddingType = {
      title: '',
      value: null,
      type: 'income',
      category: ''
    }

    currentTransactionEditing: TransactionType = {
      id: null,
      title: null,
      value: null,
      type: null,
      category: null,
      date: null
    }

    clearTransaction() {
      this.defaultTransaction = {
        title: '',
        value: null,
        type: 'income',
        category: ''
      }
    }

    editTransaction(transaction: TransactionType) {
      const transactionData: TransactionType = {
        id: transaction.id,
        title: transaction.title,
        value: transaction.value,
        type: transaction.type,
        category: transaction.category
      }

      if (transactionData.type === 'expense') {
        transactionData.value = transactionData.value * -1
      }

      this.currentTransactionEditing = {
        id: transactionData.id,
        title: transactionData.title,
        value: transactionData.value,
        type: transactionData.type,
        category: transactionData.category
      }

      transactionType.value = transactionData.type
      modalsStore.editTransactionModal.toogleModal()
    }

    postTransaction(data: TransactionAddingType) {
      const transaction = data
      userStore.postTransactionUser(transaction)
    }

    updateTransaction(data: TransactionType) {
      userStore.updateTransactionUser(data, data.id)
      modalsStore.editTransactionModal.toogleModal()
    }

    deleteTransaction(id: string) {
      userStore.deleteTransactionUser(id)
    }
  }

  const transactionActions = new Transaction()

  const transactions = ref<TransactionType[]>([])
  const transactionType = ref()

  const incomePercent = ref<string>()
  const expensePercent = ref<string>()
  const transactionsPercents = ref<string[]>([])

  function getLastThreeTransactions() {
    return transactions.value.slice(-3)
  }

  function getTransactionValueString(value: number) {
    const valueString = ref(
      value < 10 && value > -10
        ? '0' + Math.abs(value).toFixed(2)
        : Math.abs(value).toFixed(2)
    )

    return value < 0 ? `- R$ ${valueString.value}` : `R$ ${valueString.value}`
  }

  function getCurrentBalance(transactionsArray: TransactionType[]) {
    const currentBalance = transactionsArray
      .map((transaction) => transaction.value)
      .reduce((acc, value) => {
        return acc + value
      }, 0)

    return currentBalance
  }

  function getCurrentBalanceString(transactionsArray: TransactionType[]) {
    const currentBalanceString = ref(
      getTransactionValueString(getCurrentBalance(transactionsArray))
    )

    return currentBalanceString
  }

  function getIncomeBalance(transactionsArray: TransactionType[]) {
    const incomeBalance = transactionsArray
      .map((transaction) => transaction.value)
      .filter((value) => value > 0)
      .reduce((acc, value) => {
        return acc + value
      }, 0)

    return incomeBalance
  }

  function getIncomeBalanceString(transactionsArray: TransactionType[]) {
    const incomeBalanceString = ref(
      getTransactionValueString(getIncomeBalance(transactionsArray))
    )

    return incomeBalanceString
  }

  function getExpenseBalance(transactionsArray: TransactionType[]) {
    const expenseBalance = transactionsArray
      .map((transaction) => transaction.value)
      .filter((value) => value < 0)
      .reduce((acc, value) => {
        return acc + value
      }, 0)

    return expenseBalance
  }

  function getExpenseBalanceString(transactionsArray: TransactionType[]) {
    const expenseBalance = ref(getExpenseBalance(transactionsArray))

    if (expenseBalance.value === 0) {
      const defaultExpenseBalanceString = ref('R$ 00.00')
      return defaultExpenseBalanceString.value
    }

    return getTransactionValueString(expenseBalance.value * -1)
  }

  function getMonthTransactions(month: string) {
    const filteredTransactions = ref(
      transactions.value.filter(
        (transaction) =>
          transaction.date.toLocaleDateString('pt-BR', { month: 'numeric' }) ==
          month
      )
    )

    return filteredTransactions.value
  }

  function getTransactionsPercents(transactionsArray: TransactionType[]) {
    const transactionsValues = transactionsArray.map(
      (transaction) => transaction.value
    )

    const totalReducedValue = transactionsValues.reduce((acc, value) => {
      if (value < 0) value = value * -1
      return acc + value
    }, 0)

    incomePercent.value = (
      (transactionsValues.reduce((acc, value) => {
        if (value > 0) return acc + value
        return acc
      }, 0) /
        totalReducedValue) *
      100
    ).toFixed(0)

    expensePercent.value = (
      (transactionsValues.reduce((acc, value) => {
        if (value < 0) {
          value = value * -1
          return acc + value
        }
        return acc
      }, 0) /
        totalReducedValue) *
      100
    ).toFixed(0)

    return [incomePercent.value, expensePercent.value]
  }

  return {
    transactionActions,
    transactions,
    transactionType,

    incomePercent,
    expensePercent,
    transactionsPercents,
    getTransactionsPercents,

    getTransactionValueString,

    getCurrentBalance,
    getCurrentBalanceString,

    getIncomeBalance,
    getIncomeBalanceString,

    getExpenseBalance,
    getExpenseBalanceString,

    getLastThreeTransactions,
    getMonthTransactions
  }
})
