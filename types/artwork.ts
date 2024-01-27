export interface Object {
  startDate: number | null;
  endDate: number | null;
}

export interface Artist {
  name: string | null;
  nationality: string | null;
}

export interface Artwork {
  id: number | null;
  primaryImage: string | null;
  additionalImages: string[] | null;
  title: string | null;
  culture: string | null;
  artist: Artist | null;
  object: Object | null;
}
