<script lang="ts" setup>

</script>

<template>
  <div class="container">
    <header class="header">
      <div>
        <BaseLink to="/">
          <BaseIcon name="material-symbols-light:home-rounded" />
        </BaseLink>
      </div>
      <nav>
        <ul>
          <li class="nav-item">
            <BaseLink to="/">
              <BaseIcon name="material-symbols-light:account-box-outline" />
              <div>Profile</div>
            </BaseLink>
          </li>
        </ul>
      </nav>
    </header>
  </div>
</template>

<style lang="postcss" scoped>
.header {
  margin-top: 24px;
  background-color: var(--color-gray-100);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-radius: 8px;
  box-shadow: var(--shadow-default);

  ul {
    padding: 0;
    margin: 0;

    li {
      list-style-type: none;
    }
  }

  .nav-item {
    a {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }
}
</style>
