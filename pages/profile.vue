<script lang="ts" setup>
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

async function handleLogout() {
  try {
    await authStore.logout();

    navigateTo('/login');
  } catch (error) {
    // show toast
  }
}
</script>

<template>
  <div class="page profile-page">
    <h1>Hi {{ user?.email }}</h1>
    <BaseButton @click="handleLogout">
      Log out
    </BaseButton>
  </div>
</template>

<style lang="postcss" scoped></style>
