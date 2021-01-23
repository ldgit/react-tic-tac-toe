const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => {
  const config = {
    entry: {
      main: './src/index.js',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[chunkhash].js',
    },
    optimization: {
      splitChunks: { chunks: 'all' },
    },
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
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: ['file-loader'],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        minify: true,
      }),
    ],
  };

  if (argv.mode === 'development') {
    config.devtool = 'eval-source-map';
  }

  return config;
};
