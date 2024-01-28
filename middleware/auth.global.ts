export default defineNuxtRouteMiddleware((to) => {
  const { isLoggedIn } = useAuthStore();

  const allowedRoutes = ['/', '/login'];

  if (!allowedRoutes.includes(to.path) && !isLoggedIn) {
    return navigateTo('/login');
  }
});
