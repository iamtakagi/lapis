import fs from 'fs';
import Koa from 'koa';

export const mp3 = async (ctx: Koa.ParameterizedContext, next: Koa.Next) => {
  try {
    const baseDir = __dirname + '/../../../mp3/';
    const isExists = fs.readdirSync(baseDir).find(file => file === ctx.params.trackId + '.mp3');
    if (!isExists) {
      ctx.status = 404;
      ctx.response.body = 'File not found';
      return;
    }

    const filePath = baseDir + ctx.params.trackId + '.mp3';
    const stat = fs.statSync(filePath);
    const totalSize = stat.size;

    // Seek support
    if (ctx.request.headers.range) {
      const range = ctx.request.headers.range;
      const parts = range.replace(/bytes=/, '').split('-');
      const partialStart = parts[0];
      const partialEnd = parts[1];
      const start = parseInt(partialStart, 10);
      const end = partialEnd ? parseInt(partialEnd, 10) : totalSize - 1;
      const chunkSize = end - start + 1;
      ctx.status = 206;
      ctx.body = fs.createReadStream(filePath, { start, end });
      ctx.set('Content-Type', 'audio/mpeg');
      ctx.set('Content-Range', 'bytes ' + start + '-' + end + '/' + totalSize);
      ctx.set('Accept-Ranges', 'bytes');
      ctx.set('Content-Length', String(chunkSize));
    } else {
      ctx.status = 200;
      ctx.body = fs.createReadStream(filePath);
      ctx.set('Content-Type', 'audio/mpeg');
      ctx.set('Content-Length', String(totalSize));
      ctx.set('Content-Disposition', 'attachment; filename=' + ctx.params.trackId + '.mp3');
    }
  } catch (e) {
    console.error(e);
    ctx.throw(500, 'Internal Server Error');
  }
};
