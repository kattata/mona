<script setup lang="ts">
const props = defineProps<{
  name: string;
}>();
</script>

<template>
  <Icon :name="props.name" color="white" class="icon" />
</template>

<style lang="postcss" scoped>
.icon {
  width: 24px;
  height: 24px;
}
</style>
