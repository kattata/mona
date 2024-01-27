<script lang="ts" setup>
import type { Artwork } from '~~/types/artwork';
const artwork = ref<Artwork | null>(null);
const dailyArtworkIdCookie = useCookie('dailyArtworkId').value;

const { data, pending } = useAsyncData('artwork', () => $fetch(`/api/artwork/${dailyArtworkIdCookie}`));

watch(() => data.value, () => {
  artwork.value = data.value?.data || null;
}, { immediate: true });

</script>

<template>
  <div class="page">
    <div class="daily">
      <template v-if="pending">
        Loading...
      </template>
      <template v-else>
        <main>
          <NuxtImg v-if="artwork?.primaryImage" :src="artwork?.primaryImage" loading="eager" class="daily__main-image" />
          <div>
            <h1>{{ artwork?.title }}</h1>
            <div>{{ artwork?.artist?.name }}</div>
            <div class="daily__dates">
              {{ artwork?.object?.startDate }} - {{ artwork?.object?.endDate }}
            </div>
          </div>
        </main>
      </template>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.daily {
  max-width: 1000px;
  margin: 20px auto;
  background-color: var(--color-gray-100);
  border-radius: 8px;
  padding: 24px;

  main {
    display: flex;
    gap: 24px;
  }
}

img {
  width: 500px;
  height: 500px;
  object-fit: cover;
}
</style>
