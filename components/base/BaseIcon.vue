<script setup lang="ts">
const props = defineProps<{
  name: string;
}>();
</script>

<template>
  <UIcon :name="props.name" />
</template>
