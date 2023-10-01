import { SearchResult } from './spotify/types';
import { Track } from './types';

export interface TopViewData {
  tracksCount: number; // 保存されている曲データ総数
  recentSearchedTracks: Track[]; // 最近検索された曲データ (10件)
}

export interface SearchViewData {
  searchResult: SearchResult; // 検索結果
}

export interface TrackViewData {
  track: Track;
}
