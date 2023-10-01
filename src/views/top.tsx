import React from 'react';

import { TopViewData } from '../data';

export const TopView: React.FC<TopViewData> = data => {
  return (
    <html>
      <head>
        <meta charSet="UTF-8" />
        <link rel="stylesheet" href="/public/top.css" />
        <link rel="preload" type="script" href="/public/top.js" />
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
        <script src="/public/top.js" />
      </body>
    </html>
  );
};
