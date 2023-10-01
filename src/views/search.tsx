import React from 'react';

import { SearchViewData } from '../data';

export const SearchView: React.FC<SearchViewData> = data => {
  return (
    <html>
      <head>
        <meta charSet="UTF-8" />
        <link rel="stylesheet" href="/public/search.css" />
        <link rel="preload" type="script" href="public/search.js" />
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
        <script src="/public/search.js" />
      </body>
    </html>
  );
};
