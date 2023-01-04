import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { db, users } from '../../firebase'
import router from '../../router'
import { useCategories } from '../categories'
import { useUser } from '../user'

export type LoginUserData = {
  email: string
  password: string
}

export type RegisterUserData = {
  name: string
}

export type FirestoreUser = {
  uid: string
  name: string
  email: string
}

export const useAuth = defineStore('auth', () => {
  const auth = getAuth()

  const userStore = useUser()
  const categoriesStore = useCategories()

  const authSituation = ref<boolean>(false)

  const login = async (user: LoginUserData) => {
    const { email, password } = user
    await signInWithEmailAndPassword(auth, email, password)
  }

  const logout = async () => {
    await signOut(auth)
      .then(() => {
        userStore.clearUserData()
        return
      })
      .catch((error) => console.log(error))
  }

  const createAccount = async (user: LoginUserData & RegisterUserData) => {
    const { name, email, password } = user
    await createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        const userUid = userCredential.user.uid
        const registeredUser = {
          uid: userUid,
          name: name,
          email: email
        }
        sendUserToDB(registeredUser)
        router.push('/')
      }
    )
  }

  const sendUserToDB = (user: FirestoreUser) => {
    setDoc(doc(db, 'users', user.uid), user)
    const userCategories = collection(users, user.uid, 'categories')
    categoriesStore.defaultCategories.forEach((category) =>
      addDoc(userCategories, category)
    )
  }

  return {
    login,
    logout,
    createAccount,
    authSituation
  }
})
