<script setup lang="ts">
const props = defineProps<{
  name: string;
  bgColor?: string;
}>();

const emit = defineEmits(['click']);
</script>

<template>
  <button class="reset-button icon-button" @click="emit('click')">
    <BaseIcon :name="props.name" class="icon-button__icon" />
  </button>
</template>

<style lang="postcss" scoped>
.icon-button {
  width: 34px;
  height: 34px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: v-bind(props.bgColor);
  border-radius: 50%;
  transition: all 0.2s ease-in-out;
}
</style>
