import { Token, getToken } from './token';

import axios from 'axios';
import { SearchResult, Track, Error } from './types';

export class SpotifyAPI {
  clientId: string;
  clientSecret: string;
  tokenUrl: string;
  baseUrl: string;

  constructor() {
    this.clientId = process.env.SPOTIFY_CLIENT_ID ?? '';
    this.clientSecret = process.env.SPOTIFY_CLIENT_SECRET ?? '';
    this.tokenUrl = 'https://accounts.spotify.com/api/token';
    this.baseUrl = 'https://api.spotify.com/v1';
  }

  buildAuthKey(id: string, secret: string): string {
    const authKey = Buffer.from(`${id}:${secret}`).toString('base64');
    return authKey;
  }

  async getAccessToken(): Promise<{ token?: Token; error?: Error }> {
    const authKey = this.buildAuthKey(this.clientId, this.clientSecret);

    const headers = {
      'Authorization': `Basic ${authKey}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    const form = 'grant_type=client_credentials';

    try {
      const response = await axios.post(this.tokenUrl, form, { headers });
      if (response.data.error) {
        return { error: response.data.error };
      }
      if (response.data && response.status == 200) {
        return { token: response.data };
      }
      return { error: { message: 'Internal Server Error', status: 500 } };
    } catch (err) {
      throw new Error(String(err));
    }
  }

  async search(
    query: string,
    type: string,
    limit: string,
    market: string = 'JP',
  ): Promise<{ searchResult?: SearchResult; error?: Error }> {
    query = encodeURIComponent(query);
    type = encodeURIComponent(type);
    limit = encodeURIComponent(limit);
    market = encodeURIComponent(market);
    const token = getToken().token;
    const url = `${this.baseUrl}/search?q=${query}&type=${type}&limit=${limit}&market=${market}`;
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const response = await axios.get(url, { headers });
      console.log(response);
      if (response.data.error) {
        return { error: response.data.error };
      }
      if (response.data && response.status == 200) {
        return { searchResult: response.data };
      }
      return { error: { message: 'Internal Server Error', status: 500 } };
    } catch (err) {
      throw new Error(String(err));
    }
  }

  async getTrack(
    trackId: string,
    market: string = 'JP',
  ): Promise<{ track?: Track; error?: Error }> {
    trackId = encodeURIComponent(trackId);
    market = encodeURIComponent(market);
    const token = getToken().token;
    const url = `${this.baseUrl}/tracks/${trackId}?market=${market}`;
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const response = await axios.get(url, { headers });
      if (response.data.error) {
        return { error: response.data.error };
      }
      if (response.data && response.status == 200) {
        return { track: response.data };
      }
      return { error: { message: 'Internal Server Error', status: 500 } };
    } catch (err) {
      throw new Error(String(err));
    }
  }
}

const spotify = new SpotifyAPI();
export { spotify };
