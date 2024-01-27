<script lang="ts" setup>
import type { Artwork } from '~~/types/artwork';
const artwork = ref<Artwork | null>(null);

const { data } = useAsyncData('artwork', () => $fetch('/api/artwork'));

watch(() => data.value, () => {
  artwork.value = data.value?.data;
}, { immediate: true });

</script>

<template>
  <div class="page">
    <NuxtImg v-if="artwork?.primaryImage" :src="artwork?.primaryImage" loading="eager" />
    <pre>
      {{ artwork }}
    </pre>
  </div>
</template>

<style lang="postcss" scoped>
img {
  width: 500px;
  height: 500px;
  object-fit: cover;
}
</style>
