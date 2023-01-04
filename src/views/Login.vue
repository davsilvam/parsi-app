<script setup lang="ts">
  import { ExclamationCircleIcon } from '@heroicons/vue/20/solid'
  import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
  import { ref, watchEffect } from 'vue'
  import { RouterLink } from 'vue-router'
  import InputSubmitButton from '../components/FormInputSubmitButton.vue'
  import InputEmail from '../components/LoginInputEmail.vue'
  import InputPassword from '../components/LoginInputPassword.vue'
  import { LoginUserData, useAuth } from '../stores/auth'

  const authStore = useAuth()

  const breakpoints = useBreakpoints(breakpointsTailwind)

  const smallerThanMd = ref(breakpoints.smaller('md'))
  const mdAndLarger = ref(breakpoints.greaterOrEqual('md'))

  const disabled = ref<boolean>(true)

  const loginUserData = ref<LoginUserData>({
    email: '',
    password: ''
  })

  function handleEmailInput(data: string) {
    loginUserData.value.email = data
    console.log(loginUserData.value)
  }

  function handlePassInput(data: string) {
    loginUserData.value.password = data
  }

  function fieldsAreFilled() {
    return loginUserData.value.email && loginUserData.value.password
  }

  function handleSubmitButtonSituation() {
    fieldsAreFilled() ? (disabled.value = false) : (disabled.value = true)
  }

  watchEffect(() => handleSubmitButtonSituation())

  function checkForm() {
    fieldsAreFilled() ? login() : alert('Preencha todos os campos, por favor!')
  }

  function login() {
    authStore
      .login(loginUserData.value)
      .catch((error: { code: string }) => handleError(error))
  }

  type Errors = {
    userNotFound: boolean
    wrongPass: boolean
    tooManyRequests: boolean
  }

  const errors = ref<Errors>({
    userNotFound: false,
    wrongPass: false,
    tooManyRequests: false
  })

  function restartErrorMessages() {
    errors.value = {
      userNotFound: false,
      wrongPass: false,
      tooManyRequests: false
    }
  }

  function handleError(error: { code: string }) {
    restartErrorMessages()

    switch (error.code) {
      case 'auth/wrong-password': {
        errors.value.wrongPass = true
        break
      }

      case 'auth/user-not-found': {
        errors.value.userNotFound = true
        break
      }

      case 'auth/too-many-requests': {
        errors.value.tooManyRequests = true
        break
      }
    }
  }
</script>

<template>
  <main
    class="flex h-screen min-h-screen w-full flex-col items-center justify-between overflow-hidden bg-shark-200 dark:bg-shark-900 md:flex-row-reverse"
  >
    <div
      class="flex w-full items-center justify-center py-20 md:w-1/2 lg:w-2/3"
    >
      <img
        class="w-1/2 max-w-[160px] md:max-w-[220px] lg:max-w-[280px]"
        src="../assets/imgs/parsi_logo.png"
        alt="Parsi Logo"
      />
    </div>
    <div
      class="flex h-full w-full items-center justify-center bg-shark-100 p-8 shadow-lg dark:bg-shark-700 max-md:rounded-t-2xl md:w-1/2 lg:w-1/3 lg:rounded-r-2xl"
      :class="{ rollUp: smallerThanMd, rollLeft: mdAndLarger }"
    >
      <form
        class="flex w-full flex-col items-center justify-center gap-20 md:gap-16"
        @submit.prevent="checkForm"
      >
        <div class="flex h-full w-full flex-col gap-6">
          <h2
            class="font-semibold text-zinc-900 dark:text-zinc-100 md:text-2xl"
          >
            Fazer login
          </h2>
          <div class="flex w-full flex-col items-center justify-center gap-6">
            <div class="flex w-full flex-col items-end gap-2">
              <InputEmail @email="handleEmailInput" />
              <p
                class="items-center gap-1 text-xs text-red-500"
                :class="[errors.userNotFound ? 'flex' : 'hidden']"
              >
                Não há usuários com esse email.
                <ExclamationCircleIcon class="w-4" />
              </p>
            </div>
            <div class="flex w-full flex-col items-end gap-2">
              <InputPassword @password="handlePassInput" />
              <p
                class="items-center gap-1 text-xs text-red-500"
                :class="[errors.wrongPass ? 'flex' : 'hidden']"
              >
                Senha incorreta.
                <ExclamationCircleIcon class="w-4" />
              </p>
            </div>
          </div>
        </div>
        <div class="flex w-full flex-col items-center justify-center gap-3">
          <div class="flex w-full flex-col items-center gap-2">
            <InputSubmitButton :value="'Entrar'" :disabled="disabled" />
            <p
              class="items-center gap-1 text-xs text-red-500"
              :class="[errors.tooManyRequests ? 'flex' : 'hidden']"
            >
              <ExclamationCircleIcon class="w-4" />
              Você fez muitas requisições, tente novamente mais tarde.
            </p>
          </div>
          <RouterLink
            class="hover-colors text-xs text-zinc-700 dark:text-zinc-400"
            to="/registro"
            >Não tem conta? Registre-se!</RouterLink
          >
        </div>
      </form>
    </div>
  </main>
</template>

<style scoped>
  .rollUp {
    animation: rollUp 0.8s ease-in-out backwards;
  }

  .rollLeft {
    animation: rollLeft 0.8s ease-in-out backwards;
  }

  @keyframes rollUp {
    from {
      opacity: 0.25;
      transform: translateY(100%);
    }

    to {
      opacity: 1;
      transform: translateY(0%);
    }
  }

  @keyframes rollLeft {
    from {
      opacity: 0.25;
      transform: translateX(-100%);
    }

    to {
      opacity: 1;
      transform: translateX(0%);
    }
  }
</style>
