import type { Database } from '~/types/supabase'

export const useArtworkStore = defineStore('artwork', () => {
  const dailyArtworkId = ref<string>('');
  const temporaryId = ref<string>('');

  const supabase = useSupabaseClient<Database>();

  const authStore = useAuthStore()
  const { user } = storeToRefs(authStore);

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

  async function addToFavorites(artworkId: string) {
    try {
      const { error } = await supabase
      .from('favorites')
      .upsert({ userId: user.value?.id, artworkId })
      .select()

      if (error) {
        throw new Error(error as any)
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }

  async function getFavorites() : Promise<Database['public']['Tables']['favorites']['Row'][] | null> {
    if (!user.value?.id) {
      return null;
    }

    try {
      const { data, error } = await supabase
      .from('favorites')
      .select()
      .eq('userId', user.value?.id)

      if (error) {
        throw new Error(error as any)
      }

      return data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }

    return null;
  }

  return {
    dailyArtworkId,
    temporaryId,
    getDailyArtwork,
    addToFavorites,
    getFavorites
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
