export const useArtworkStore = defineStore('artwork', () => {
  const dailyArtworkId = ref<string>('');
  const temporaryId = ref<string>('');

  async function getDailyArtwork() {
    try {
      const { data } = await useFetch('/api/artworks');
      const artworks = data.value?.data?.artworks;
      const total = data.value?.data?.total;

      const randomIndex = Math.floor(Math.random() * (total - 0 + 1));
      const randomArtworkId = artworks?.[randomIndex];

      temporaryId.value = String(randomArtworkId);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }

  return {
    dailyArtworkId,
    temporaryId,
    getDailyArtwork
  };
}, {
  persist: {
    storage: persistedState.cookiesWithOptions({
      expires: new Date(new Date().setHours(24, 0, 0, 0)),
      sameSite: true
    }),
    key: 'dailyArtworkId'
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useArtworkStore as any, import.meta.hot));
}
