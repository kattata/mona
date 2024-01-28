<script setup lang="ts">
interface Props {
  height?: null | string;
  mimic?: 'extra-small-paragraph' | 'small-paragraph' | 'paragraph' | 'large-paragraph' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5',
  width?: string,
}

const props = withDefaults(defineProps<Props>(), {
  height: null,
  width: '100%',
  mimic: 'paragraph'
});

const inlineStyles = computed(() => {
  const styles = [];

  if (props.height) {
    styles.push({
      height: props.height
    });
  }

  if (props.width) {
    styles.push({
      width: props.width
    });
  }

  return styles;
});

const mimicType = computed(() => {
  return props.height ? 'custom' : props.mimic;
});
</script>

<template>
  <span class="skeleton" :class="`skeleton--mimic-${mimicType}`" :style="inlineStyles" />
</template>

<style lang="postcss">
.skeleton {
  display: inline-block;
  height: inherit;
  background-color: var(--color-skeleton-light);
  background-image: linear-gradient(90deg, var(--color-skeleton-light), var(--color-skeleton-dark), var(--color-skeleton-light));
  background-repeat: no-repeat;
  background-size: 200px 100%;
  animation: 1.5s ease-in-out 0s infinite normal none running SkeletonLoading;

  &--mimic-custom {
    line-height: var(--line-height-base);
    border-radius: var(--border-radius-default);
  }

  &--mimic-extra-small-paragraph {
    height: var(--font-size-extra-small);
    line-height: var(--line-height-base);
    border-radius: var(--border-radius-default);
  }

  &--mimic-small-paragraph {
    height: var(--font-size-small);
    line-height: var(--line-height-base);
    border-radius: var(--border-radius-default);
  }

  &--mimic-paragraph {
    height: var(--font-size-base);
    line-height: var(--line-height-base);
    border-radius: var(--border-radius-default);
  }

  &--mimic-large-paragraph {
    height: var(--font-size-large);
    line-height: var(--line-height-base);
    border-radius: var(--border-radius-default);
  }

  &--mimic-h1 {
    height: var(--h1-font-size);
    line-height: var(--h1-line-height);
    border-radius: var(--border-radius-default);
  }

  &--mimic-h2 {
    height: var(--h2-font-size);
    line-height: var(--h2-line-height);
    border-radius: var(--border-radius-default);
  }

  &--mimic-h3 {
    height: var(--h3-font-size);
    line-height: var(--h3-line-height);
    border-radius: var(--border-radius-default);
  }

  &--mimic-h4 {
    height: var(--h4-font-size);
    line-height: var(--h4-line-height);
    border-radius: var(--border-radius-default);
  }

  &--mimic-h5 {
    height: var(--h5-font-size);
    line-height: var(--h5-line-height);
    border-radius: var(--border-radius-default);
  }
}

@keyframes SkeletonLoading {
  0% {
    background-position: -200px 0;
  }

  100% {
    background-position: calc(200px + 100%) 0;
  }
}
</style>
