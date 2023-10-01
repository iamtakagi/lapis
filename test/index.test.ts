import { beforeEach, describe, expect, it, test } from 'vitest';
import { LapisServer } from '../src/server';
import { LapisRouter } from '../src/router';
import fetch from 'node-fetch';

require('dotenv').config();

console.log(process.env);

describe('index.ts', () => {
  let router: LapisRouter;
  let server: LapisServer;

  describe('ブート周り', () => {
    it('ルータ初期化できる', () => {
      router = new LapisRouter();
      router.init();
      expect(router).not.toBeNull();
    });

    it('サーバ初期化できる', () => {
      server = new LapisServer(router);
      server.init();
      expect(server).not.toBeNull();
    });

    it('サーバが起動できる', () => {
      server.start();
    });
  });

  describe('アクセスできるか', () => {
    it('トップページにアクセスできる', async () => {
      const res = await fetch('http://localhost:3000/');
      expect(res.status).toBe(200);
    });

    it('トークンを取得できる', async () => {
      const res = await fetch('http://localhost:3000/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          secret: process.env.SECRET,
        }),
      });
      expect(res.status).toBe(200);
    });

    it('検索できる', async () => {
      const res = await fetch('http://localhost:3000/search?=' + encodeURIComponent('ギョウ'), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      expect(res.status).toBe(200);
    });

    it('曲ページ開ける', async () => {
      const res = await fetch('http://localhost:3000/track/6y0igZArWVi6Iz0rj35c1Y', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      expect(res.status).toBe(200);

      it('曲ページの情報が取得できる', async () => {
        const elements = res.body as unknown as string as unknown as HTMLElement;
        expect(elements, '要素ある').not.toBeNull();

        const frame = elements.querySelector('iframe');
        expect(frame, '埋め込みある').not.toBeNull();

        const src = frame?.getAttribute('src');
        expect(src, 'srcある').not.toBeNull();

        const lyrics = elements.querySelector('p');
        expect(lyrics, '歌詞ある').not.toBeNull();
      });
    });
  });
});
