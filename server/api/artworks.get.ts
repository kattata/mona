import { APIResponse } from '~/types/server';
import { noData } from '~/utils/server';

export default defineEventHandler(async (): Promise<APIResponse | null> => {
  let parsedRes = null;

  async function fetchValidArtworks() {
    try {
      const res = await fetch('https://collectionapi.metmuseum.org/public/collection/v1/search?q=*&isHighlighted=true&hasImages=true');
      const data = await res.json();

      parsedRes = {
        data: {
          total: data.total,
          artworks: data.objectIDs
        },
        success: true
      };
    } catch (error) {
      noData();
    }
  }

  await fetchValidArtworks();

  return parsedRes;
});
