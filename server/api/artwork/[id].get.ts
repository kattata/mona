import { APIResponse } from '~/types/server';
import { isNullable, noData } from '~/utils/server';

export default defineEventHandler(async (event): Promise<APIResponse | null> => {
  let parsedRes: APIResponse | null = null;

  const id = getRouterParam(event, 'id');

  async function fetchArtworkById() {
    try {
      const res = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);
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

  await fetchArtworkById();

  if (!parsedRes?.data?.primaryImage) {
    await fetchArtworkById();
  }

  return parsedRes;
});
