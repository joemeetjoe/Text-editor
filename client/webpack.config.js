const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');


// TODO: Add and configure workbox plugins for a service worker and manifest file.


module.exports = () => {
  return {
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
        title: 'Webpack Plugin',
      }),
      new WebpackPwaManifest({
        name: 'Just Another Text Editor',
        inject: true,
        short_name: 'J.A.T.E.',
        description: 'Takes notes with JavaScript syntax highlighting!',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        orientation: 'portrait',
        // crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
        start_url: '/',
        publicPath: '/',
        icons: [
          {
            src: path.resolve('./src/images/logo.png'),
            sizes: [96, 128], // multiple sizes
            destination: path.join('assets', 'icons')
          },
        ]
      }),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }), 
    ],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
          // use: [
          //   {
          //     loader: 'url-loader',
          //     options: {
          //       name: 'images/[hash]-[name].[ext]'
          //     }
          //   }
          // ]
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
};
