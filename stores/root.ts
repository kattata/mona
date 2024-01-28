import { useArtworkStore } from './artwork';
import { useAuthStore } from './auth';

export const useRootStore = defineStore('root', () => {
  const authStore = useAuthStore();
  const { getDailyArtwork, setDailyArtworkCookie, dailyArtworkId } = useArtworkStore();
  const { user } = storeToRefs(authStore);

  const dailyArtworkIdCookie = useCookie('dailyArtworkId').value;

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

    if (dailyArtworkIdCookie) {
      return;
    }

    if (user.value?.id) {
      setDailyArtworkCookie(String(dailyArtworkId), user.value?.id);
    }
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
