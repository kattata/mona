<script lang="ts" setup>
const { isLoggedIn } = useAuthStore();

onMounted(() => {
  if (isLoggedIn) {
    return navigateTo('/daily');
  }

  navigateTo('/login');
})
</script>
