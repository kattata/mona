<script setup lang="ts">
import { useLayoutStore } from '~/stores/layout';

const layoutStore = useLayoutStore();
const { isToastDisplayed, options } = storeToRefs(layoutStore);

function handleClose() {
  isToastDisplayed.value = false;
}

</script>

<template>
  <Transition name="slide">
    <div v-if="isToastDisplayed" class="toast">
      <BaseIcon name="material-symbols:error-outline-rounded" />
      <div>{{ options.message }}</div>
      <button class="reset-button toast__close-btn" @click="handleClose">
        <BaseIcon name="material-symbols:close-rounded" />
      </button>
    </div>
  </Transition>
</template>

<style lang="postcss" scoped>
.toast {
  position: fixed;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 24px;
  top: 24px;
  right: 24px;
  border-radius: var(--border-radius-default);
  background-color: var(--color-red-90);
  box-shadow: var(--shadow-default);

  &__close-btn {
    margin-left: 12px;
  }

  .icon {
    width: 16px;
    height: 16px;
  }
}

.slide-leave-active,
.slide-enter-active {
  transition: all 0.3s ease-out;
}

.slide-enter-from,
.slide-leave-to {
  transform: translate(100%, 0);
  opacity: 0;
}
</style>
