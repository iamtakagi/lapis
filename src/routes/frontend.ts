import fs from 'fs';
import Koa from 'koa';

export const frontend = (ctx: Koa.ParameterizedContext, next: Koa.Next) => {
  try {
    const baseDir = __dirname + '/../../../public';
    const fileName = ctx.params.fileName;
    const isExists = fs.readdirSync(baseDir).find(file => file === fileName);
    if (!isExists) {
      ctx.status = 404;
      ctx.response.body = 'File not found';
      return;
    }
    const ext = fileName.split('.');
    ctx.type =
      (
        {
          js: 'application/javascript',
          css: 'text/css',
        } as { [key: string]: string }
      )[ext.slice(-1)[0]] ?? 'application/octet-stream';
    ctx.body = fs.createReadStream(baseDir + '/' + fileName);
  } catch (e) {
    console.error(e);
    ctx.throw(500, 'Internal Server Error');
  }
};
