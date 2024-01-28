<script lang="ts" setup>
const props = withDefaults(defineProps<{
  to?: string;
  loading?: boolean;
  disabled?: boolean;
  modifiers?: string[];
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'tertiary';
}>(), {
  to: () => '',
  modifiers: () => [],
  type: 'button',
  variant: 'primary'
});

const buttonClasses = computed(() => {
  const variant = `button--${props.variant}`;

  if (!props.modifiers?.length) {
    return variant;
  }

  const modifiers = props.modifiers.map(x => `button--${x}`).join(' ');

  return [variant, ...modifiers];
});

const isDisabled = computed(() => { return props.disabled || props.loading; });
</script>

<template>
  <button class="reset-button button" :class="`${buttonClasses}`" :disabled="isDisabled" :type="type">
    <slot />
  </button>
</template>
