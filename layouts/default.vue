<script lang="ts" setup>

</script>

<template>
  <div class="layout">
    <!-- <NuxtLoadingIndicator color="#c80046" /> -->
    <div class="layout__header">
      header
    </div>
    <div class="layout__content">
      <slot />
    </div>
    <div class="layout__footer">
      footer
    </div>
  </div>
</template>

<style lang="postcss" scoped></style>
