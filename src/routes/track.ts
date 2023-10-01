import Koa from 'koa';
import { tokenMiddleware } from '../middlewares/tokenMiddleware';
import { QueryResult } from 'pg';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { database } from '../database';
import { spotify } from '../spotify/api';
import { gatherLyrics } from '../spotify/lyrics';
import { Track } from '../types';
import { TrackView } from '../views/track';
import { downloadMP3 } from '../spotify/spotdl';

export const track = async (ctx: Koa.ParameterizedContext, next: Koa.Next) => {
  await tokenMiddleware(ctx, next);

  let { id } = ctx.params;

  console.log(id);

  const errors: string[] = [];

  if (!id) {
    errors.push('id is required');
  }
  if (typeof id !== 'string') {
    errors.push('id must be string');
  }

  id = id as string;

  // そもそも曲が取れない
  const { track, error } = await spotify.getTrack(id);

  if (error) {
    ctx.response.status = error.status;
    ctx.response.body = error.message;
    return;
  }

  let queryResultTrack: QueryResult<Track> | undefined;

  try {
    // 歌詞取得済みでなければ取得してDBに保存
    queryResultTrack = await database.query(`SELECT * FROM tracks WHERE id=$1`, [id]);
    if (!queryResultTrack || queryResultTrack.rowCount === 0 || !queryResultTrack.rows[0]) {
      const { track, error } = await spotify.getTrack(id);

      // なんらかのエラー
      if (error) {
        ctx.response.status = error.status;
        ctx.response.body = error.message;
        return;
      }

      // Spotify から曲が取れたら歌詞を取得してDBに保存
      // 歌詞が取れなくてもDBに保存する仕様
      if (track) {
        const { name, album, artists } = track;
        const gatheredLyrics = await gatherLyrics(id); // TODO: 連続でアクセスされると重くて鯖が死ぬのでJob化する
        queryResultTrack = await database.query(
          `INSERT INTO tracks (id, name, album, images, artists, lyrics) VALUES ($1, $2, $3, $4, $5, $6);`,
          [
            id,
            name,
            album.name,
            JSON.stringify(album.images),
            JSON.stringify(artists.map(({ id, name }) => ({ id, name }))),
            `{${gatheredLyrics.map(lyric => `"${lyric}"`).join(', ')}}`,
          ],
        );

        // download mp3
        const mp3 = await downloadMP3(id);
        if (!mp3) {
          console.error(`Failed to download ${id}`);
        }
      }
    }

    // リリース当初は歌詞が非公開の曲もあるので、何度も試す
    if (queryResultTrack.rows[0] && queryResultTrack.rows[0].lyrics.length === 0) {
      const getheredLyrics = await gatherLyrics(id); // TODO: 連続でアクセスされると重くて鯖が死ぬのでJob化する
      if (getheredLyrics.length > 0) {
        queryResultTrack = await database.query(`UPDATE tracks SET lyrics=$1 WHERE id=$2;`, [
          `{${getheredLyrics.map(lyric => `"${lyric}"`).join(', ')}}`,
          id,
        ]);
      }
    }

    ctx.response.set('Cache-Control', 'public, max-age=86400'); // 1 day
    ctx.response.status = 200;
    ctx.body =
      '<!DOCTYPE html>\n' +
      renderToStaticMarkup(
        createElement(TrackView, {
          track: queryResultTrack.rows[0],
        }),
      );
  } catch (err) {
    ctx.response.status = 500;
    ctx.throw(500, ('Internal Server Error: ' + err) as string);
  }
};
