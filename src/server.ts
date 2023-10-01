import Koa from 'koa';
import Router from 'koa-router';

export class LapisServer extends Koa {
  private router: Router;

  constructor(router: Router) {
    super();
    this.router = router;
  }

  public init() {
    this.use(this.router.routes()).use(this.router.allowedMethods());
  }

  public start() {
    this.listen(process.env.PORT || 3000);
  }
}
