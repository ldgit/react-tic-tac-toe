const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = (env, argv) => ({
  entry: {
    polyfills: './src/polyfills.js',
    'react-polyfills': './src/react-polyfills.js',
    main: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
  },
  optimization: {
    splitChunks: {
      // We want to load polyfills separately and only if the browser does not support needed features.
      chunks: chunk => !['react-polyfills', 'polyfills'].includes(chunk.name),
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
      // Custom parameter, these chunks are injected differently, see template above
      polyfills: ['polyfills', 'react-polyfills'],
      inject: false,
    }),
  ],
});
