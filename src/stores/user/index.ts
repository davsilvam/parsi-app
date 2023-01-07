import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  updateDoc
} from 'firebase/firestore'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { db, users } from '../../firebase'
import { FirestoreUser, useAuth } from '../auth'
import { BudgetType, useBudgets } from '../budgets'
import { CategoryType, useCategories } from '../categories'
import {
  TransactionAddingType,
  TransactionType,
  useTransactions
} from '../transactions'

export const useUser = defineStore('user', () => {
  const authStore = useAuth()
  const budgetsStore = useBudgets()
  const categoriesStore = useCategories()
  const transactionsStore = useTransactions()

  const user = ref<FirestoreUser>({
    name: '',
    email: '',
    uid: ''
  })

  const loading = ref<boolean>(true)

  let userBudgets: CollectionReference,
    userCategories: CollectionReference,
    userTransactions: CollectionReference

  async function getUserData() {
    loading.value = true

    const dataUsername = doc(db, 'users', user.value.uid)

    await getDoc(dataUsername).then((response) => {
      user.value.name = response.data().name
      user.value.email = response.data().email
    })

    userBudgets = collection(users, user.value.uid, 'budgets')
    userCategories = collection(users, user.value.uid, 'categories')
    userTransactions = collection(users, user.value.uid, 'transactions')

    onSnapshot(userCategories, (snapshot) => {
      const dbCategories: CategoryType[] = []

      snapshot.forEach((doc) => {
        const { name, type } = doc.data()

        const category: CategoryType = {
          id: doc.id,
          name: name,
          type: type
        }

        dbCategories.push(category)
      })

      categoriesStore.categories = dbCategories
    })

    const userDataCollection = query(userTransactions, orderBy('date'))

    onSnapshot(userDataCollection, (snapshot) => {
      const dbTransactions: TransactionType[] = []

      if (snapshot.docs.length === 0) {
        return (transactionsStore.transactions = dbTransactions)
      }

      snapshot.forEach((doc) => {
        const { title, category, value, date, type } = doc.data()

        const transaction: TransactionType = {
          id: doc.id,
          title: title,
          category: category,
          value: value,
          date: new Date(date),
          type: type
        }

        dbTransactions.push(transaction)
      })

      transactionsStore.transactions = dbTransactions
      transactionsStore.getTransactionsPercents(dbTransactions)

      getDocs(userBudgets).then((response) => {
        const dbBudgets: BudgetType[] = []
        const transactionsArray = ref<TransactionType[]>(
          transactionsStore.transactions
        )

        response.forEach((doc) => {
          const now = new Date()

          let { category, maxValue, currentValue, initialDate, finishDate } =
            doc.data()

          function getCurrentValue() {
            const currentValue = ref<TransactionType[]>(transactionsArray.value)

            currentValue.value = transactionsStore.getMonthTransactions(
              now.toLocaleDateString('pt-BR', { month: 'numeric' })
            )

            currentValue.value = currentValue.value.filter(
              (transaction) => transaction.category === category
            )

            return currentValue.value.length === 0
              ? 0
              : currentValue.value
                  .map((transaction) => transaction.value)
                  .reduce((acc, value) => acc + value, 0) * -1
          }

          initialDate = now.toLocaleDateString('pt-BR', { month: 'short' })
          finishDate =
            now.getMonth() == 11
              ? new Date(now.getFullYear() + 1, 0, 1).toLocaleDateString(
                  'pt-BR',
                  { month: 'short' }
                )
              : new Date(
                  now.getFullYear(),
                  now.getMonth() + 1,
                  1
                ).toLocaleDateString('pt-BR', { month: 'short' })

          currentValue = getCurrentValue()

          const budget: BudgetType = {
            id: doc.id,
            category: category,
            maxValue: maxValue,
            currentValue: currentValue,
            initialDate: initialDate,
            finishDate: finishDate
          }

          dbBudgets.push(budget)
        })

        budgetsStore.budgets = dbBudgets
      })
    })

    onSnapshot(userBudgets, (snapshot) => {
      const dbBudgets: BudgetType[] = []

      if (snapshot.docs.length === 0) {
        return (budgetsStore.budgets = dbBudgets)
      }

      const transactionsArray = ref(transactionsStore.transactions)

      snapshot.forEach((doc) => {
        let { category, maxValue, currentValue, initialDate, finishDate } =
          doc.data()
        const now = new Date()

        const getCurrentValue = () => {
          const currentValue = ref<TransactionType[]>(transactionsArray.value)

          return currentValue.value
            .filter((transaction) => transaction.category === category)
            .map((transaction) => transaction.value)
            .reduce((acc, value) => acc + value, 0) * -1
        }

        initialDate = now.toLocaleDateString('pt-BR', { month: 'short' })

        finishDate =
          now.getMonth() == 11
            ? new Date(now.getFullYear() + 1, 0, 1).toLocaleDateString(
                'pt-BR',
                { month: 'short' }
              )
            : new Date(
                now.getFullYear(),
                now.getMonth() + 1,
                1
              ).toLocaleDateString('pt-BR', { month: 'short' })

        currentValue = getCurrentValue()

        const budget: BudgetType = {
          id: doc.id,
          category: category,
          maxValue: maxValue,
          currentValue: currentValue,
          initialDate: initialDate,
          finishDate: finishDate
        }

        dbBudgets.push(budget)
      })

      budgetsStore.budgets = dbBudgets
    })

    authStore.authSituation = true
    loading.value = false
  }

  async function postBudgetUser(data: BudgetType) {
    await addDoc(userBudgets, data)
  }

  async function updateBudgetUser(data: BudgetType, id: string) {
    await updateDoc(doc(userBudgets, id), data)
  }

  async function deleteBudgetUser(id: string) {
    await deleteDoc(doc(userBudgets, id))
  }

  async function postCategoryUser(data: CategoryType) {
    await addDoc(userCategories, data)
  }

  async function deleteCategoryUser(id: string) {
    await deleteDoc(doc(userCategories, id))
  }

  async function postTransactionUser(data: TransactionAddingType) {
    await addDoc(userTransactions, data)
  }

  async function updateTransactionUser(data: TransactionType, id: string) {
    await updateDoc(doc(userTransactions, id), data)
  }

  async function deleteTransactionUser(id: string) {
    await deleteDoc(doc(userTransactions, id))
  }

  function clearUserData() {
    loading.value = true

    user.value = {
      name: '',
      email: '',
      uid: ''
    }

    userBudgets = null
    userCategories = null
    userTransactions = null
    transactionsStore.transactions = []

    loading.value = false
  }

  return {
    user,
    loading,
    postBudgetUser,
    updateBudgetUser,
    deleteBudgetUser,
    postCategoryUser,
    postTransactionUser,
    updateTransactionUser,
    deleteCategoryUser,
    deleteTransactionUser,
    getUserData,
    clearUserData
  }
})
