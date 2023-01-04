<script setup lang="ts">
  import { ExclamationCircleIcon } from '@heroicons/vue/20/solid'
  import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
  import { ref, watchEffect } from 'vue'
  import { RouterLink } from 'vue-router'
  import InputSubmitButton from '../components/FormInputSubmitButton.vue'
  import InputEmail from '../components/LoginInputEmail.vue'
  import InputName from '../components/LoginInputName.vue'
  import InputPassword from '../components/LoginInputPassword.vue'
  import { LoginUserData, RegisterUserData, useAuth } from '../stores/auth'

  const authStore = useAuth()

  const breakpoints = useBreakpoints(breakpointsTailwind)

  const smallerThanMd = ref(breakpoints.smaller('md'))
  const mdAndLarger = ref(breakpoints.greaterOrEqual('md'))

  const disabled = ref<boolean>(true)

  const registerUserData = ref<LoginUserData & RegisterUserData>({
    name: '',
    email: '',
    password: ''
  })

  function handleNameInput(data: string) {
    registerUserData.value.name = data
  }

  function handleEmailInput(data: string) {
    registerUserData.value.email = data
  }

  function handlePassInput(data: string) {
    registerUserData.value.password = data
  }

  function fieldsAreFilled() {
    return (
      registerUserData.value.name &&
      registerUserData.value.email &&
      registerUserData.value.password
    )
  }

  function handleSubmitButtonSituation() {
    fieldsAreFilled() ? (disabled.value = false) : (disabled.value = true)
  }

  watchEffect(() => handleSubmitButtonSituation())

  function checkForm() {
    fieldsAreFilled()
      ? registerUser()
      : alert('Preencha todos os campos, por favor!')
  }

  function registerUser() {
    authStore
      .createAccount(registerUserData.value)
      .catch((error: { code: string }) => handleError(error))
  }

  const errors = ref({
    emailAlreadyInUse: false,
    weakPassword: false
  })

  function restartErrorMessages() {
    errors.value = {
      emailAlreadyInUse: false,
      weakPassword: false
    }
  }

  function handleError(error: { code: string }) {
    restartErrorMessages()

    switch (error.code) {
      case 'auth/email-already-in-use': {
        errors.value.emailAlreadyInUse = true
        break
      }

      case 'auth/weak-password': {
        errors.value.weakPassword = true
        break
      }
    }
  }
</script>

<template>
  <main
    class="flex h-screen min-h-screen w-full flex-col items-center justify-between overflow-hidden bg-shark-200 dark:bg-shark-900 md:flex-row"
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
      class="flex h-full w-full items-center justify-center bg-shark-100 p-8 shadow-lg dark:bg-shark-700 max-md:rounded-t-2xl md:w-1/2 lg:w-1/3 lg:rounded-l-2xl"
      :class="{ rollUp: smallerThanMd, rollRight: mdAndLarger }"
    >
      <form
        class="flex w-full flex-col items-center justify-center gap-20 md:gap-16"
        @submit.prevent="checkForm"
      >
        <div class="flex h-full w-full flex-col gap-6">
          <h2
            class="font-semibold text-zinc-900 dark:text-zinc-100 md:text-2xl"
          >
            Registrar-se
          </h2>
          <div class="flex w-full flex-col items-center justify-center gap-6">
            <InputName @name="handleNameInput" />
            <div class="flex w-full flex-col items-end gap-2">
              <InputEmail @email="handleEmailInput" />
              <p
                class="items-center gap-1 text-xs text-red-500"
                :class="[errors.emailAlreadyInUse ? 'flex' : 'hidden']"
              >
                O email já está em uso.
                <ExclamationCircleIcon class="w-4" />
              </p>
            </div>
            <div class="flex w-full flex-col items-end gap-2">
              <InputPassword @password="handlePassInput" />
              <p
                class="items-center gap-1 text-xs text-red-500"
                :class="[errors.weakPassword ? 'flex' : 'hidden']"
              >
                A senha deve ter mais que 6 caracteres.
                <ExclamationCircleIcon class="w-4" />
              </p>
            </div>
          </div>
        </div>
        <div class="flex w-full flex-col items-center justify-center gap-3">
          <InputSubmitButton :value="'Registrar'" :disabled="disabled" />
          <RouterLink
            class="hover-colors text-xs text-zinc-700 dark:text-zinc-400"
            to="/login"
            >Já tem uma conta? Faça login!</RouterLink
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

  .rollRight {
    animation: rollRight 0.8s ease-in-out backwards;
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

  @keyframes rollRight {
    from {
      opacity: 0.25;
      transform: translateX(100%);
    }

    to {
      opacity: 1;
      transform: translateX(0%);
    }
  }
</style>
