import { z } from 'zod';

export const zSpotifyError = z.object({
  error: z.object({ status: z.number(), message: z.string() })
})

export const zTokenResult = z.object({
  access_token: z.string(),
  token_type: z.string(),
  expires_in: z.number(),
});

export const zSearchResult = z.object({
  tracks: z.object({
    href: z.string(),
    items: z.array(
      z.union([
        z.object({
          album: z.object({
            album_type: z.string(),
            artists: z.array(
              z.object({
                external_urls: z.object({ spotify: z.string() }),
                href: z.string(),
                id: z.string(),
                name: z.string(),
                type: z.string(),
                uri: z.string()
              })
            ),
            external_urls: z.object({ spotify: z.string() }),
            href: z.string(),
            id: z.string(),
            images: z.array(
              z.object({
                height: z.number(),
                url: z.string(),
                width: z.number()
              })
            ),
            is_playable: z.boolean(),
            name: z.string(),
            release_date: z.string(),
            release_date_precision: z.string(),
            total_tracks: z.number(),
            type: z.string(),
            uri: z.string()
          }),
          artists: z.array(
            z.object({
              external_urls: z.object({ spotify: z.string() }),
              href: z.string(),
              id: z.string(),
              name: z.string(),
              type: z.string(),
              uri: z.string()
            })
          ),
          disc_number: z.number(),
          duration_ms: z.number(),
          explicit: z.boolean(),
          external_ids: z.object({ isrc: z.string() }),
          external_urls: z.object({ spotify: z.string() }),
          href: z.string(),
          id: z.string(),
          is_local: z.boolean(),
          is_playable: z.boolean(),
          name: z.string(),
          popularity: z.number(),
          preview_url: z.string(),
          track_number: z.number(),
          type: z.string(),
          uri: z.string()
        }),
        z.object({
          album: z.object({
            album_type: z.string(),
            artists: z.array(
              z.object({
                external_urls: z.object({ spotify: z.string() }),
                href: z.string(),
                id: z.string(),
                name: z.string(),
                type: z.string(),
                uri: z.string()
              })
            ),
            external_urls: z.object({ spotify: z.string() }),
            href: z.string(),
            id: z.string(),
            images: z.array(
              z.object({
                height: z.number(),
                url: z.string(),
                width: z.number()
              })
            ),
            is_playable: z.boolean(),
            name: z.string(),
            release_date: z.string(),
            release_date_precision: z.string(),
            total_tracks: z.number(),
            type: z.string(),
            uri: z.string()
          }),
          artists: z.array(
            z.object({
              external_urls: z.object({ spotify: z.string() }),
              href: z.string(),
              id: z.string(),
              name: z.string(),
              type: z.string(),
              uri: z.string()
            })
          ),
          disc_number: z.number(),
          duration_ms: z.number(),
          explicit: z.boolean(),
          external_ids: z.object({ isrc: z.string() }),
          external_urls: z.object({ spotify: z.string() }),
          href: z.string(),
          id: z.string(),
          is_local: z.boolean(),
          is_playable: z.boolean(),
          name: z.string(),
          popularity: z.number(),
          preview_url: z.null(),
          track_number: z.number(),
          type: z.string(),
          uri: z.string()
        })
      ])
    ),
    limit: z.number(),
    next: z.string(),
    offset: z.number(),
    previous: z.null(),
    total: z.number()
  })
});

export const zTrack = z.object({
  album: z.object({
    album_type: z.string(),
    artists: z.array(
      z.object({
        external_urls: z.object({ spotify: z.string() }),
        href: z.string(),
        id: z.string(),
        name: z.string(),
        type: z.string(),
        uri: z.string()
      })
    ),
    external_urls: z.object({ spotify: z.string() }),
    href: z.string(),
    id: z.string(),
    images: z.array(
      z.object({ height: z.number(), url: z.string(), width: z.number() })
    ),
    is_playable: z.boolean(),
    name: z.string(),
    release_date: z.string(),
    release_date_precision: z.string(),
    total_tracks: z.number(),
    type: z.string(),
    uri: z.string()
  }),
  artists: z.array(
    z.object({
      external_urls: z.object({ spotify: z.string() }),
      href: z.string(),
      id: z.string(),
      name: z.string(),
      type: z.string(),
      uri: z.string()
    })
  ),
  disc_number: z.number(),
  duration_ms: z.number(),
  explicit: z.boolean(),
  external_ids: z.object({ isrc: z.string() }),
  external_urls: z.object({ spotify: z.string() }),
  href: z.string(),
  id: z.string(),
  is_local: z.boolean(),
  is_playable: z.boolean(),
  name: z.string(),
  popularity: z.number(),
  preview_url: z.string(),
  track_number: z.number(),
  type: z.string(),
  uri: z.string()
});
