export const useArtworkStore = defineStore('artwork', () => {
  const dailyArtworkId = ref<number>(0);
  // const dailyArtworkIdCookie = useCookie('dailyArtworkId').value;

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

  function setDailyArtworkCookie(value: string, userId: string) {
    const expires = new Date();
    expires.setHours(24, 0, 0, 0);

    const cookieContent = {
      userId,
      dailyId: value
    };

    useCookie('dailyArtworkId', { expires }).value = JSON.stringify(cookieContent);
  }

  return {
    dailyArtworkId,
    getDailyArtwork,
    setDailyArtworkCookie
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useArtworkStore as any, import.meta.hot));
}
