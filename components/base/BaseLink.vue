<script setup lang="ts">
const props = withDefaults(defineProps<{
  to: string;
  target?: string;
}>(), {
  to: '',
  target: '_self'
});

</script>

<template>
  <NuxtLink :to="props.url" :target="props.target">
    <slot />
  </NuxtLink>
</template>
