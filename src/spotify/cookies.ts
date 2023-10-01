import axios from 'axios';
import { Protocol } from 'puppeteer';

export const getCookies = async (): Promise<Protocol.Network.CookieParam[]> => {
  try {
    const { data } = await axios.get(process.env.SPOTIFY_COOKIE_PATH || '');
    console.log(data);
    return Promise.resolve(data);
  } catch (err) {
    throw new Error(`Error while reading cookies file: ${err}`);
  }
};
