<script lang="ts" setup>

</script>

<template>
  <div class="layout">
    <!-- <NuxtLoadingIndicator color="#c80046" /> -->
    <div class="layout__header">
      <TheHeader />
    </div>
    <div class="layout__content">
      <div class="container">
        <main>
          <slot />
        </main>
      </div>
    </div>
    <div class="layout__footer">
      <TheFooter />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.layout__content {
  margin-block: 24px;
}

main {
  margin: 20px auto;
  background-color: var(--color-gray-100);
  border-radius: 8px;
  padding: 24px;
  box-shadow: var(--shadow-default);
}
</style>
