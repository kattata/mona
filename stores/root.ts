export const useRootStore = defineStore('root', () => {
  const dailyArtworkId = ref<number>(0);
  const dailyArtworkIdCookie = useCookie('dailyArtworkId').value;

  async function getDailyArtwork() {
    try {
      const { data } = await useFetch('/api/artworks');
      const artworks = data.value?.data?.artworks;
      const total = data.value?.data?.total;

      const randomIndex = Math.floor(Math.random() * (total - 0 + 1));
      const randomArtworkId = artworks?.[randomIndex];

      dailyArtworkId.value = randomArtworkId;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }

  async function serverInit() {
    // eslint-disable-next-line no-console
    console.log('server initialized');

    if (dailyArtworkIdCookie) {
      return;
    }

    await getDailyArtwork();
  }

  function clientInit() {
    // eslint-disable-next-line no-console
    console.log('client initialized');

    const authStore = useAuthStore();
    const { isLoggedIn, user } = storeToRefs(authStore);

    if (user.value) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }

    if (dailyArtworkIdCookie) {
      return;
    }

    const expires = new Date();
    expires.setHours(24, 0, 0, 0);

    useCookie('dailyArtworkId', { expires }).value = String(dailyArtworkId.value);
  }

  return {
    dailyArtworkId,
    serverInit,
    clientInit
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useRootStore as any, import.meta.hot));
}
