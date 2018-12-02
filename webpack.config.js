const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// We want to load polyfills separately and only if the browser does not support needed features, so we don't split
// these chunks.
const splitChunksIgnoreList = ['react-polyfills', 'polyfills', 'set-polyfill'];

module.exports = (env, argv) => ({
  entry: {
    polyfills: './src/polyfill/polyfills.js',
    'react-polyfills': './src/polyfill/react-polyfills.js',
    main: './src/index.js',
    'set-polyfill': './src/polyfill/set-polyfill.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
  },
  optimization: {
    splitChunks: {
      chunks: chunk => !splitChunksIgnoreList.includes(chunk.name),
    },
  },
  devtool: argv.mode === 'development' ? 'inline-source-map' : 'none',
  devServer: {
    contentBase: './dist',
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.sass$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: false,
      // Custom parameters
      // These chunks are injected differently, see template above
      polyfills: ['polyfills', 'react-polyfills'],
      // Unlike Map or raf polyfills, Set polyfill is needed by React immediately when React bundle is loaded, thus it
      // needs to be handled differently, for details see template above
      setPolyfillChunk: 'set-polyfill',
    }),
  ],
});
