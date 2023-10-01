import React from 'react';

import { TrackViewData } from '../data';

export const TrackView: React.FC<TrackViewData> = data => {
  return (
    <html>
      <head>
        <meta charSet="UTF-8" />
        <link rel="stylesheet" href="/public/track.css" />
        <link rel="preload" type="script" href="/public/track.js" />
      </head>
      <body>
        <div id="app">
          <script
            id="page-data"
            type="application/json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(data).replaceAll(
                '<',
                '\\u' + '<'.charCodeAt(0).toString().padStart(4, '0'),
              ),
            }}
          />
        </div>
        <script src="/public/track.js" />
      </body>
    </html>
  );
};
