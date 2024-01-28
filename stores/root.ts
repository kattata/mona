import { useArtworkStore } from './artwork';

export const useRootStore = defineStore('root', () => {
  const artworkStore = useArtworkStore();

  const dailyArtworkIdCookie = useCookie('dailyArtworkId').value;

  async function serverInit() {
    // eslint-disable-next-line no-console
    console.log('server initialized');

    if (dailyArtworkIdCookie) {
      return;
    }

    await artworkStore.getDailyArtwork();
  }

  function clientInit() {
    // eslint-disable-next-line no-console
    console.log('client initialized');
  }

  return {
    serverInit,
    clientInit
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useRootStore as any, import.meta.hot));
}
