import Koa from 'koa';
import { secretMiddleware } from '../middlewares/secretMiddleware';
import { spotify } from '../spotify/api';

export const token = async (ctx: Koa.ParameterizedContext, next: Koa.Next) => {
  secretMiddleware(ctx, next);

  const { token, error } = await spotify.getAccessToken();

  console.log(token);

  if (error) {
    ctx.response.status = error.status;
    ctx.response.body = error.message;
    console.log(error);
    return;
  }

  if (token) {
    ctx.response.status = 200;
    ctx.response.body = token;
    console.log(token);
    return;
  }

  ctx.response.status = 500;
  ctx.throw(500, 'Internal Server Error');
};
