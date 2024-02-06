<script lang="ts" setup>

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const { getFavorites } = useArtworkStore();

const favorites = ref<any>([]);

const { data: favoriteList } = await useAsyncData(() => getFavorites());

if (!favoriteList.value) {
  throw createError({ statusCode: 404 })
}

const favoritesToDisplay = favoriteList.value.slice(0, 10);

favoritesToDisplay.forEach((favorite) => {
  if (!favorite.artworkId) {
    return;
  }

  fetchArtwork(favorite.artworkId)
})

async function fetchArtwork(id: string) {
  const data = await $fetch(`/api/artwork/${id}`);

  favorites.value.push(data?.data);

  return data;
}

async function handleLogout() {
  try {
    await authStore.logout();

    navigateTo('/login');
  } catch (error) {
    // show toast
  }
}

function handleOpenGallery() {
  // eslint-disable-next-line no-console
  console.log('open gallery');
}

</script>

<template>
  <div class="page profile-page">
    <h1>Hi {{ user?.email }}</h1>
    <BaseButton @click="handleLogout">
      Log out
    </BaseButton>
    <section>
      <h2>Favorites</h2>
      <div v-if="favorites.length" class="profile-page__favorites">
        <template v-for="favorite in favorites" :key="favorite.id">
          <button class="reset-button profile-page__favorite-card" @click="handleOpenGallery">
            <NuxtImg :src="favorite?.primaryImage" />
            <h3>{{ favorite?.title }}</h3>
            <div class="text-extra-small">
              {{ favorite?.artist?.name }}
            </div>
          </button>
        </template>
      </div>
      <div v-else class="profile-page__no-favorites">
        No favorites yet.
      </div>
    </section>
  </div>
</template>

<style lang="postcss" scoped>
.profile-page {
  section {
    margin-top: 32px;
    margin-bottom: 32px;
  }

  &__favorites {
    display: grid;
    gap: 16px;
    grid-template-columns: repeat(5, 1fr);
  }

  &__favorite-card {
    background-color: var(--color-gray-80);
    border-radius: var(--border-radius-default);
    padding: 12px;
    text-align: left;
    display: flex;
    flex-direction: column;

    img {
      width: 100%;
      aspect-ratio: 1/1;
      object-fit: cover;
      border-radius: var(--border-radius-default);
      margin-bottom: 8px;
    }
  }

  &__no-favorites {
    color: var(--color-gray-50);
  }
  }
</style>
