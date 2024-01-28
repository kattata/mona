export default defineNuxtRouteMiddleware((to) => {
  const { isLoggedIn } = useAuthStore();

  if (to.path !== '/login' && !isLoggedIn) {
    return navigateTo('/login');
  }
});
