import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTheme = defineStore('theme', () => {
  const isDark = ref<boolean>(true)

  return {
    isDark
  }
})
