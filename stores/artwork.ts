export const useArtworkStore = defineStore('artwork', () => {
  const dailyArtworkId = ref<number>(0);

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

  function setDailyArtworkCookie(dailyId: string, userId: string) {
    const expires = new Date();
    expires.setHours(24, 0, 0, 0);

    const cookieContent = {
      userId,
      dailyId
    };

    useCookie('dailyArtworkId', { expires }).value = JSON.stringify(cookieContent);
  }

  return {
    dailyArtworkId,
    getDailyArtwork,
    setDailyArtworkCookie
  };
}, {
  persist: {
    storage: persistedState.cookiesWithOptions({
      expires: new Date().setHours(24, 0, 0, 0)
    }),
    key: 'dailyArtworkId'
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useArtworkStore as any, import.meta.hot));
}
