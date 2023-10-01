import React from 'react';
import { searchResult } from './data';
import { createRoot } from 'react-dom/client';

import './style.css';
import { Search } from '../components/search/search';

export const App = () => {
  return (
    <div>
      <h1>lapis</h1>
      <Search />
      <div>
        <div>検索結果</div>
        {searchResult && searchResult.tracks.items.length === 0 && (
          <div>何も見つからなかったよ</div>
        )}
        {searchResult &&
          searchResult.tracks.items.map(track => {
            return (
              <div>
                <hr />
                {track.album.images.length > 0 &&
                  track.album.images[0] &&
                  track.album.images[0].url && (
                    <img src={track.album.images[0].url} alt="" width={100} />
                  )}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <a href={`/track/${track.id}`}>{track.name}</a>
                  <div>
                    {track.artists.map(({ id, name }) => {
                      return <a href={`https://open.spotify.com/artist/${id}`}>{name}</a>;
                    })}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

createRoot(document.getElementById('app')!).render(<App />);
