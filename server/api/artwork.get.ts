import { APIResponse } from '~/types/server';
import { isNullable, noData } from '~/utils/server';

export default defineEventHandler(async (): Promise<APIResponse> => {
  let parsedRes: APIResponse | null = null;

  async function fetchValidArtworks() {
    try {
      const res = await fetch('https://collectionapi.metmuseum.org/public/collection/v1/search?q=*&isHighlighted=true&hasImages=true');
      const data = await res.json();
      return data;
    } catch (error) {
      noData();
    }
  }

  async function fetchRandomArtwork() {
    try {
      const validArtworks = await fetchValidArtworks();

      if (!validArtworks) {
        return;
      }

      const total = validArtworks.total;
      const randomIndex = Math.floor(Math.random() * (total - 0 + 1));
      const randomArtworkId = validArtworks.objectIDs?.[randomIndex];

      const res = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomArtworkId}`);
      const data = await res.json();

      const artist = {
        name: isNullable(data.artistDisplayName),
        nationality: isNullable(data.artistNationality)
      };

      const object = {
        startDate: isNullable(data.objectBeginDate),
        endDate: isNullable(data.objectEndDate)
      };

      parsedRes = {
        data: {
          id: data.objectID,
          primaryImage: isNullable(data.primaryImage),
          additionalImages: data.additionalImages?.length ? data.additionalImages : null,
          title: isNullable(data.title),
          culture: isNullable(data.culture),
          artist: isNullable(artist),
          object: isNullable(object)
        },
        success: true
      };
    } catch (error) {
      noData();
    }
  }

  await fetchRandomArtwork();

  return parsedRes;
});
