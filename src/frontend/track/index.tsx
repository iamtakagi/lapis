import React, { useState } from 'react';
import { track } from './data';
import { createRoot } from 'react-dom/client';

import './style.css';
import { Search } from '../components/search/search';

export const App = () => { 
  return (
    <div>
      <h1>lapis</h1>
      <Search />
      <div>
        {track && (
          <>
            {track.lyrics && (
              <div>
                <h2>↓歌詞です♪ 歌いましょう♪</h2>
                {track.lyrics.length ? (
                  <div style={{fontSize: '1.3rem'}}>{track.lyrics.join(' ')}</div>
                ) : (
                  <div>歌詞が見つかりませんでした</div>
                )}
              </div>
            )}
            {track.id && (
              <iframe
                style={{ borderRadius: '12px', marginTop: '1em' }}
                src={`https://open.spotify.com/embed/track/${track.id}`}
                width="100%"
                height="352"
                frameBorder="0"
                allowFullScreen
                clipboard-write="true"
                encrypted-media="true"
                picture-in-picture="true"
                loading="lazy"
              ></iframe>
            )}
            {track.images && track.images.length > 0 && track.images[0] && track.images[0].url && (
              <img src={track.images[0].url} alt="" width={100} />
            )}
            <a href={`/mp3/${track.id}.mp3`}>ダウンロード ({track.id}.mp3)</a>
            <audio src={`/mp3/${track.id}.mp3`} controls></audio>
          </>
        )}
      </div>
    </div>
  );
};

createRoot(document.getElementById('app')!).render(<App />);
