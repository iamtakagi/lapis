export interface Track {
  id: string;
  name: string;
  album: string;
  images: { url: string; height: number; width: number }[];
  artists: { id: string; name: string }[];
  lyrics: string[];
  gathered_at: Date;
}
