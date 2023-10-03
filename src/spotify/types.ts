import { z } from 'zod';
import { zSpotifyError, zSearchResult, zTokenResult, zTrack } from './schema';

export interface Error {
  message: string;
  status: number;
}

export type SpotifyError = z.infer<typeof zSpotifyError>;
export type TokenResult = z.infer<typeof zTokenResult>;
export type SearchResult = z.infer<typeof zSearchResult>;
export type Track = z.infer<typeof zTrack>;
