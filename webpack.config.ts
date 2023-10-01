import { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ResolveTypeScriptPlugin from 'resolve-typescript-plugin';

const isProduction = process.env.NODE_ENV === 'production';

const config: Configuration = {
  mode: isProduction ? 'production' : 'development',
  entry: {
    top: './src/frontend/top/index.tsx',
    search: './src/frontend/search/index.tsx',
    track: './src/frontend/track/index.tsx',
  },
  output: {
    path: __dirname + '/public',
    filename: '[name].js',
    publicPath: '/',
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
    ],
  },
  devServer: {
    proxy: {
      '/': 'http://localhost:' + process.env.PORT || '3000',
    },
  },
  resolve: {
    extensions: ['.ts', '.tsx'],
    plugins: [new ResolveTypeScriptPlugin()],
  },
  plugins: [new MiniCssExtractPlugin()],
};

export default config;
