import type { Artwork } from './artwork';
import type { Artworks } from './artworks';

export interface APIResponse {
  data: Artwork | Artworks | null;
  success: boolean;
}
