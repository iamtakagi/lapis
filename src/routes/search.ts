import Koa from 'koa';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { tokenMiddleware } from '../middlewares/tokenMiddleware';
import { SearchView } from '../views/search';
import { spotify } from '../spotify/api';

export const search = async (ctx: Koa.ParameterizedContext, next: Koa.Next) => {
  await tokenMiddleware(ctx, next);

  let { q } = ctx.request.query;

  const errors: string[] = [];

  if (!q) {
    errors.push('q is required');
  }
  if (typeof q !== 'string') {
    errors.push('q must be string');
  }

  if (errors.length > 0) {
    return ctx.throw(400, JSON.stringify({ errors }));
  }

  q = q as string;

  const { searchResult, error } = await spotify.search(q, 'track', '50');

  // なんらかのエラー
  if (error) {
    ctx.response.status = error.status;
    ctx.response.body = error.message;
  }

  // なんらかのエラー
  if (!searchResult) {
    ctx.response.status = 500;
    ctx.throw(500, 'Internal Server Error');
    return;
  }

  ctx.body =
    '<!DOCTYPE html>\n' + renderToStaticMarkup(createElement(SearchView, { searchResult }));
};
