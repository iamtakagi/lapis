import puppeteer, { Protocol } from 'puppeteer';
import { getCookies } from './cookies';

const baseUrl = 'https://open.spotify.com/track';
const lyricsSelector = 'xt5C47eHPYNiriMJxGnC';
let cookies: Protocol.Network.CookieParam[] | null = null;

export const gatherLyrics = async (trackId: string): Promise<string[]> => {
  if (!cookies) {
    try {
      cookies = await getCookies();
    } catch (error) {
      throw new Error('Error while reading cookies file');
    }
  }

  const url = `${baseUrl}/${trackId}`;
  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    });
    const page = await browser.newPage();

    if (!cookies) return [];

    await page.setCookie(...cookies);
    await page.goto(url);

    try {
      await page.waitForSelector(`.${lyricsSelector}`, { timeout: 8000 });
      const lyrics = await page.$$eval(`.${lyricsSelector}`, lyrics => {
        return lyrics
          .map(verses => (verses as HTMLElement).innerText.trim())
          .filter(verse => verse.length > 0 && verse !== '' && verse !== '♪');
      });
      await browser.close();
      return lyrics;
    } catch (error) {
      console.log('no found lyrics');
      browser.close();
      return [];
    }
  } catch (error) {
    throw new Error('puppeteer error');
  }
};
