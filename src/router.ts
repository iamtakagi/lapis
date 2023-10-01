import Router from 'koa-router';

import { index } from './routes';
import { search } from './routes/search';
import { token } from './routes/token';
import { track } from './routes/track';
import { mp3 } from './routes/mp3';
import { frontend } from './routes/frontend';

export class LapisRouter extends Router {
  constructor() {
    super();
  }

  public init() {
    this.get('/', (ctx, next) => index(ctx, next));
    this.post('/token', (ctx, next) => token(ctx, next));
    this.get('/search', (ctx, next) => search(ctx, next));
    this.get('/track/:id', (ctx, next) => track(ctx, next));
    this.get('/mp3/:trackId.mp3', (ctx, next) => mp3(ctx, next));
    this.get('/public/:fileName', (ctx, next) => frontend(ctx, next));
  }
}
