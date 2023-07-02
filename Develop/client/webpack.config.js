const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const { InjectManifest } = require('workbox-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/js/index.js',
    install: './src/js/install.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
        new HtmlWebpackPlugin({
      template: './index.html',
      title: 'Jate'
    }),
       new InjectManifest({
      swSrc: './src-sw.js',
      swDest: 'src-sw.js',
    }),
    new MiniCssExtractPlugin(),
    new GenerateSW(),
    new WebpackPwaManifest({
      name: 'JATE',
      short_name: 'PWA Text Editor',
      description: 'My awesome app',
      background_color: '#ffffff', 
      theme_color: '#000000',
      icons: [
        {
          src: path.resolve('src/images/logo.png'),
          sizes: [96, 128, 192, 256, 384, 512],
          purpose: 'any maskable',
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
