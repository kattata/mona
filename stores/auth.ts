export const useAuthStore = defineStore('auth', () => {
  const supabaseClient = useSupabaseClient();
  const supabaseUser = useSupabaseUser();

  const isLoggedIn = ref<boolean>(false);

  const user = computed(() => {
    return supabaseUser.value;
  });

  async function login(email: string, password: string) {
    // TODO: Save dailyArtworkId per user

    try {
      const res = await supabaseClient.auth.signInWithPassword({
        email,
        password
      });
      isLoggedIn.value = true;
      return res;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }

  async function logout() {
    try {
      const res = await supabaseClient.auth.signOut();
      isLoggedIn.value = false;
      return res;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }

  return {
    isLoggedIn,
    user,
    login,
    logout
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore as any, import.meta.hot));
}
