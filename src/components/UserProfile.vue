<script setup lang="ts">
  import { useUser } from '../stores/user'

  defineProps<{ showData: boolean }>()

  const userStore = useUser()
</script>

<template>
  <div class="flex w-full items-center justify-start gap-3">
    <img
      class="w-10 rounded-full"
      :src="`https://avatars.dicebear.com/api/initials/${userStore.user.name}.svg`"
      alt="Profile image"
    />
    <div v-if="showData">
      <p class="font-semibold text-zinc-900 dark:text-zinc-100">
        {{ userStore.user.name }}
      </p>
      <p class="small text-medium text-zinc-600 dark:text-zinc-400">
        {{ userStore.user.email }}
      </p>
    </div>
  </div>
</template>
