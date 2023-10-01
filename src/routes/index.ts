import Koa from 'koa';
import { QueryResult } from 'pg';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { tokenMiddleware } from '../middlewares/tokenMiddleware';
import { Track } from '../types';
import { TopView } from '../views/top';
import { database } from '../database';

export const index = async (ctx: Koa.ParameterizedContext, next: Koa.Next) => {
  await tokenMiddleware(ctx, next);

  const { rowCount, rows }: QueryResult<Track> = await database.query(
    `SELECT * FROM tracks ORDER BY gathered_at DESC LIMIT 10;`,
  );

  ctx.body =
    '<!DOCTYPE html>\n' +
    renderToStaticMarkup(
      createElement(TopView, {
        tracksCount: rowCount,
        recentSearchedTracks: rows,
      }),
    );
};
