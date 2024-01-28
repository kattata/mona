<script setup lang="ts">
const props = defineProps<{
  message: string;
  duration: number;
}>();
</script>

<template>
  <div class="toast">
    <BaseIcon name="" />
    <div>{{ props.message }}</div>
  </div>
</template>

<style lang="postcss" scoped>
.toast {
  background-color: var(--color-red-90);
}
</style>
