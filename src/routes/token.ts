import Koa from 'koa';
import { secretMiddleware } from '../middlewares/secretMiddleware';
import { spotify } from '../spotify/api';

export const token = async (ctx: Koa.ParameterizedContext, next: Koa.Next) => {
  secretMiddleware(ctx, next);

  const { tokenResult, error } = await spotify.getAccessToken();

  if (error) {
    ctx.response.status = error.status;
    ctx.response.body = error.message;
    return;
  }

  if (tokenResult) {
    ctx.response.status = 200;
    ctx.response.body = tokenResult;
    return;
  }

  ctx.response.status = 500;
  ctx.throw(500, 'Internal Server Error');
};
