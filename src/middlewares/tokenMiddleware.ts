import Koa from 'koa';
import axios from 'axios';
import { credential } from '../spotify/credential';
import { zTokenResult } from '../spotify/schema';

export const tokenMiddleware = async (ctx: Koa.ParameterizedContext, next: Koa.Next) => {

  if (!credential.getToken() || credential.hasExpired()) {
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

      if (response.data && response.status == 200) {
        const tokenResult = zTokenResult.parse(response.data);
        credential.setToken(tokenResult.access_token);
      }

      return next();
    } catch (err) {
      ctx.response.status = 500;
      ctx.throw(500, 'Internal Server Error');
    }
  }
  next();
};
