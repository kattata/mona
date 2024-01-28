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
  <NuxtLink :to="props.to" :target="props.target">
    <slot />
  </NuxtLink>
</template>

<style lang="postcss" scoped>
a {
  color: var(--color-white);
  text-decoration: none;
  transition: all 0.2s ease-in-out;

  &:hover {
    opacity: 0.7;
  }
}
</style>
