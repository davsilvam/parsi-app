<script setup lang="ts">
  import { getAuth, onAuthStateChanged } from 'firebase/auth'
  import { onBeforeMount } from 'vue'
  import parsiLogo from '../assets/imgs/parsi_logo.png'
  import router from '../router'
  import { useAuth } from '../stores/auth'
  import { useUser } from '../stores/user'

  const authStore = useAuth()
  const userStore = useUser()

  onBeforeMount(() => {
    onAuthStateChanged(getAuth(), async (userAuth) => {
      if (userAuth) {
        userStore.user.uid = userAuth.uid
        await userStore.getUserData()
        router.push('/')
      } else {
        userStore.user.uid = null
        authStore.authSituation = false
        await userStore.clearUserData()
        router.push('/login')
      }
    })
  })
</script>

<template>
  <div
    class="absolute z-50 grid h-screen w-screen place-items-center bg-shark-100 dark:bg-shark-900"
  >
    <img
      class="w-1/2 animate-pulse md:w-1/3 lg:w-1/5"
      :src="parsiLogo"
      alt="Parsi logo pulsing in the screen."
    />
  </div>
</template>
