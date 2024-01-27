<script lang="ts" setup>

</script>

<template>
  <header class="header">
    <div>
      <BaseLink to="/">
        Mona
      </BaseLink>
    </div>
    <ul>
      <li>Profile</li>
    </ul>
  </header>
</template>

<style lang="postcss" scoped>
.header {
  background-color: var(--color-gray-100);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-radius: 8px;

  ul {
    padding: 0;
    margin: 0;

    li {
      list-style-type: none;
    }
  }
}
</style>
