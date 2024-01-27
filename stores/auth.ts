export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref<boolean>(true);

  return {
    isLoggedIn
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore as any, import.meta.hot));
}
