<script setup lang="ts">
  import { Teleport } from 'vue'
  import { RouterView } from 'vue-router'
  import BudgetAddModal from './components/BudgetAddModal.vue'
  import BudgetEditModal from './components/BudgetEditModal.vue'
  import CategoryAddModal from './components/CategoryAddModal.vue'
  import CategoryDeleteModal from './components/CategoryDeleteModal.vue'
  import LogoutModal from './components/LogoutModal.vue'
  import MobilePanel from './components/MobilePanel.vue'
  import TransactionAddedTooltip from './components/TransactionAddedTooltip.vue'
  import TransactionAddModal from './components/TransactionAddModal.vue'
  import TransactionEditModal from './components/TransactionEditModal.vue'
  import router from './router'
  import { useAuth } from './stores/auth'
  import { useModals } from './stores/modals'
  import { useTheme } from './stores/theme'

  router.push('/loading')

  const authStore = useAuth()
  const modalsStore = useModals()
  const themeStore = useTheme()
</script>

<template>
  <div id="app_container" :class="{ dark: themeStore.isDark }">
    <div class="flex min-h-screen w-full flex-col lg:flex-row">
      <div class="w-full bg-shark-300 dark:bg-shark-800">
        <RouterView v-slot="{ Component }">
          <Transition name="fade" mode="out-in">
            <Component :is="Component" />
          </Transition>
        </RouterView>
      </div>
      <MobilePanel v-if="authStore.authSituation" />
    </div>
  </div>
  <Teleport to="body">
    <Transition name="modal">
      <TransactionAddModal
        v-if="modalsStore.addTransactionModal.status"
        :class="{ dark: themeStore.isDark }"
      />
    </Transition>
  </Teleport>
  <Teleport to="body">
    <Transition name="modal">
      <TransactionEditModal
        v-if="modalsStore.editTransactionModal.status"
        :class="{ dark: themeStore.isDark }"
      />
    </Transition>
  </Teleport>
  <Teleport to="body">
    <Transition name="modal">
      <CategoryAddModal
        v-if="modalsStore.addCategoryModal.status"
        :class="{ dark: themeStore.isDark }"
      />
    </Transition>
  </Teleport>
  <Teleport to="body">
    <Transition name="modal">
      <CategoryDeleteModal
        v-if="modalsStore.deleteCategoryModal.status"
        :class="{ dark: themeStore.isDark }"
      />
    </Transition>
  </Teleport>
  <Teleport to="body">
    <Transition name="modal">
      <LogoutModal
        v-if="modalsStore.logoutModal.status"
        :class="{ dark: themeStore.isDark }"
      />
    </Transition>
  </Teleport>
  <Teleport to="body">
    <Transition name="modal">
      <BudgetAddModal
        v-if="modalsStore.addBudgetModal.status"
        :class="{ dark: themeStore.isDark }"
      />
    </Transition>
  </Teleport>
  <Teleport to="body">
    <Transition name="modal">
      <BudgetEditModal
        v-if="modalsStore.editBudgetModal.status"
        :class="{ dark: themeStore.isDark }"
      />
    </Transition>
  </Teleport>
  <Teleport to="body">
    <Transition name="tooltip">
      <TransactionAddedTooltip
        v-if="modalsStore.addedTooltip.status"
        :class="{ dark: themeStore.isDark }"
      />
    </Transition>
  </Teleport>
</template>

<style>
  .modal-enter-active,
  .modal-leave-active {
    transition: all 0.15s ease;
  }

  .modal-enter-from,
  .modal-leave-to {
    opacity: 0;
    transform: scale(1.1);
  }

  .tooltip-enter-active,
  .tooltip-leave-active {
    animation: showTooltip 0.25s ease-in-out backwards;
  }

  .tooltip-enter-from,
  .tooltip-leave-to {
    animation: hideTooltip 0.25s ease-in-out backwards;
  }

  @keyframes showTooltip {
    from {
      transform: translateY(50%);
      opacity: 0;
    }

    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes hideTooltip {
    from {
      transform: translateY(0);
      opacity: 1;
    }

    to {
      transform: translateY(50%);
      opacity: 0;
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease-out;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
