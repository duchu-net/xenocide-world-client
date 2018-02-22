import webpack from 'webpack'
import path from 'path'
import baseConfig from './webpack.config.base'

export default {
  ...baseConfig,

  devtool: 'eval',

  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    // historyApiFallback: true,
    // contentBase: './',
    // hot: true
  },

  entry: [
    ...baseConfig.entry,
    'webpack/hot/only-dev-server',
    'webpack-dev-server/client?http://localhost:8080',
    path.resolve(__dirname, '../src/index.js'),
  ],

  output: {
    ...baseConfig.output,
    // filename: '[name].js',
  },

  module: {
    ...baseConfig.module,
    loaders: [
      ...baseConfig.module.loaders,
      {
        test: /\.js?$/,
        loaders: ['react-hot-loader/webpack', 'babel-loader'],
        exclude: /node_modules/
      },
      // {
      //   test: /\.js?$/,
      //   loaders: ['react-hot-loader', 'babel-loader'],
      //   include: /duchunet-web-client/
      // }
    ]
  },

  plugins: [
    ...baseConfig.plugins,
    // new webpack.HotModuleReplacementPlugin(),
  ]
}
