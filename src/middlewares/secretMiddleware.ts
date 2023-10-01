import Koa from 'koa';

export const secretMiddleware = (ctx: Koa.ParameterizedContext, next: Koa.Next) => {
  const { secret } = ctx.request.query;

  if (secret !== process.env.SECRET) {
    ctx.response.status = 401;
    ctx.response.body = {
      error: { message: 'Unauthorized' },
    };
  }

  next();
};
