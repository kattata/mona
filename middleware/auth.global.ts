export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore();
  const { isLoggedIn } = storeToRefs(authStore);

  const allowedRoutes = ['/', '/login'];

  if (!allowedRoutes.includes(to.path) && !isLoggedIn.value) {
    return navigateTo('/login');
  }
});
