import Koa from 'koa';
import { setToken, getToken } from '../spotify/token';
import axios from 'axios';

export const tokenMiddleware = async (ctx: Koa.ParameterizedContext, next: Koa.Next) => {
  const token = getToken();

  if (!token.token || (token.expiresIn && new Date() >= token.expiresIn)) {
    try {
      const response = await axios.post(
        'http://localhost:3000/token',
        {
          secret: process.env.SECRET,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.data.error) {
        ctx.response.status = response.data.error.status;
        ctx.response.body = response.data.error;
        return;
      }

      if (response.data && response.data.access_token) {
        setToken(response.data.access_token);
      }

      return next();
    } catch (err) {
      ctx.response.status = 500;
      ctx.throw(500, 'Internal Server Error');
    }
  }
  next();
};
