import React, { useState } from 'react';
import { recentSearchedTracks, tracksCount } from './data';
import { createRoot } from 'react-dom/client';

import './style.css';
import { Search } from '../components/search/search';

export const App = () => {
  return (
    <div>
      <h1>lapis</h1>
      <p>現在、{tracksCount}曲のデータを提供しています</p>
      <Search />
      <div>
        <h2>最近、収集された曲データ (直近10件)</h2>
        {recentSearchedTracks &&
          recentSearchedTracks.map(({ id, name, images, lyrics, artists }) => {
            return (
              <div>
                <hr />
                {images.length > 0 && images[0] && images[0].url && (
                  <img src={images[0].url} alt="" width={100} />
                )}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <a href={`/track/${id}`}>{name}</a>
                  <div>
                    {artists.map(({ id, name }) => {
                      return <a href={`https://open.spotify.com/artist/${id}`}>{name}</a>;
                    })}
                  </div>
                </div>
                {lyrics.length ? (
                  <div>{lyrics.slice(0, 10).join(' ').trim()}...</div>
                ) : (
                  <div>歌詞が見つかりませんでした</div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

createRoot(document.getElementById('app')!).render(<App />);
