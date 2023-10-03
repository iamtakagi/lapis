import axios from 'axios';
import { SearchResult, Track, Error, TokenResult } from './types';
import { zSpotifyError, zSearchResult, zTokenResult, zTrack } from './schema';
import { credential } from './credential';
import fs from 'fs';

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

  async getAccessToken(): Promise<{ tokenResult?: TokenResult; error?: Error }> {
    const authKey = this.buildAuthKey(this.clientId, this.clientSecret);

    const headers = {
      'Authorization': `Basic ${authKey}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    const form = 'grant_type=client_credentials';

    try {
      const response = await axios.post(this.tokenUrl, form, { headers });
      if (response.data.error) {
        return { error: zSpotifyError.parse(response.data).error };
      }
      if (response.data && response.status == 200) {
        return { tokenResult: zTokenResult.parse(response.data) };
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
    const token = credential.getToken();
    const url = `${this.baseUrl}/search?q=${query}&type=${type}&limit=${limit}&market=${market}`;

    try {
      const response = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
      if (response.data.error) {
        return { error: zSpotifyError.parse(response.data).error };
      }
      if (response.data && response.status == 200) {
        return { searchResult: zSearchResult.parse(response.data) };
      }
      return { error: { message: 'Internal Server Error', status: 500 } };
    } catch (err) {
      throw new Error(String(err));
    }
  }

  async getTrack(
    trackId: string,
    market: string = 'JP',
  ): Promise<{ track?: Track; error?: any }> {
    trackId = encodeURIComponent(trackId);
    market = encodeURIComponent(market);
    const token = credential.getToken();
    const url = `${this.baseUrl}/tracks/${trackId}?market=${market}`;

    try {
      const response = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
      if (response.data.error) {
        return { error: zSpotifyError.parse(response.data).error };
      }
      if (response.data && response.status == 200) {
        return { track: zTrack.parse(response.data)};
      }
      return { error: { message: 'Internal Server Error', status: 500 } };
    } catch (err) {
      throw new Error(String(err));
    }
  }
}

const spotify = new SpotifyAPI();
export { spotify };
