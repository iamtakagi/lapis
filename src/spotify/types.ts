import { z } from 'zod';
import { error, searchResult, track } from './schema';

export type Error = z.infer<typeof error>;
export type SearchResult = z.infer<typeof searchResult>;
export type Track = z.infer<typeof track>;
