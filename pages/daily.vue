<script lang="ts" setup>
import type { Artwork } from '~~/types/artwork';
const artwork = ref<Artwork | null>(null);
const dailyArtworkIdCookie = useCookie('dailyArtworkId').value;

const { data, pending } = useAsyncData('artwork', () => $fetch(`/api/artwork/${dailyArtworkIdCookie}`));

watch(() => data.value, () => {
  artwork.value = data.value?.data || null;
}, { immediate: true });

function addToFavorites() {
  // eslint-disable-next-line no-console
  console.log('add to favorites');
}

</script>

<template>
  <div class="page">
    <div class="daily">
      <div class="daily__main-image-wrapper">
        <BaseSkeleton v-if="pending" width="100%" height="100%" class="daily__main-image daily__main-image--placeholder" />
        <NuxtImg
          v-else-if="artwork?.primaryImage"
          :src="artwork?.primaryImage"
          loading="eager"
          class="daily__main-image"
        />
      </div>
      <div class="daily__details">
        <div class="daily__details-header">
          <div v-if="pending" class="daily__details-header-info">
            <BaseSkeleton v-if="pending" mimic="h1" />
            <BaseSkeleton v-if="pending" mimic="paragraph" />
            <BaseSkeleton v-if="pending" mimic="paragraph" />
          </div>
          <div v-else class="daily__details-header-info">
            <h1>{{ artwork?.title }}</h1>
            <div>{{ artwork?.artist?.name }}</div>
            <div class="daily__dates">
              {{ artwork?.object?.startDate }} - {{ artwork?.object?.endDate }}
            </div>
          </div>
          <div class="daily__details-actions">
            <BaseIconButton name="fluent:heart-20-regular" bg-color="var(--color-red-90)" class="daily__favorite-btn" @click="addToFavorites" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.daily {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;

  @media(min-width: 992px) {
    grid-template-columns: 1fr 1fr;
    height: calc(100vh - (140px + (20px * 2)));
  }

  &__main-image-wrapper {
    width: 100%;
    max-height: 100%;
    overflow: hidden;

    .daily__main-image {
      width: 100%;
      height: 100%;
      border-radius: 8px;
      object-fit: cover;

      &--placeholder {
        background-color: var(--color-gray-80);
      }
    }
  }

  &__details-header {
    display: flex;
    gap: 24px;
    justify-content: space-between;
  }

  &__details-header-info {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__favorite-btn {
    &:hover {
      background-color: var(--color-red-100);
    }
  }
}
</style>
