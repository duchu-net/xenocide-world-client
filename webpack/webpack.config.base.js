import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'


const PROCESS_ENV = {
  NODE_ENV: JSON.stringify(process.env.NODE_ENV),
  BUILD_ENV: JSON.stringify(process.env.BUILD_ENV),
}


export default {
  target: 'web',
  entry: [],
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: "[name].bundle.js",
    chunkFilename: "[name].chunk.js",
  },
  resolve: {
    alias: {
      // components: path.resolve(__dirname, 'src/components'),
      // modules: path.resolve(__dirname, 'src/modules'),
      // pages: path.resolve(__dirname, 'src/pages'),
      // assets: path.resolve(__dirname, 'src/assets'),
      // store: path.resolve(__dirname, 'src/store/store'),
      // react: path.resolve(__dirname, 'node_modules/react'),
      // 'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
      // 'react-flexbox-grid': path.resolve(__dirname, 'node_modules/react-flexbox-grid'),
      // 'react-redux': path.resolve(__dirname, 'node_modules/react-redux'),
    },
    modules: ["node_modules"],
  },
  module: {
    loaders: [
      // JS --------------------------------------------------------------------
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      // {
      //   test: /\.js?$/,
      //   loader: 'babel-loader',
      //   include: /duchunet-web-client/
      // },
      // {
      //   test: /\.js?$/,
      //   loader: 'babel-loader',
      //   include: /xenocide/
      // },
      // END JS

      // JSON ------------------------------------------------------------------
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      // END JSON

      {
        test: /\.(md|glsl)$/,
        use: 'raw-loader'
      },

      // FONTS -----------------------------------------------------------------
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff&name=./assets/[name].[hash].[ext]'
      },
      // END FONTS

      // OTHER FILES -----------------------------------------------------------
      {
        test: /\.(jpe?g|ttf|eot|svg|png|gif|vash)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=./assets/[name].[hash].[ext]'
      },
      // END OTHER FILES

      // STYLES ----------------------------------------------------------------
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
      },
      {
        test: /\.global\.css$/,
        loaders: [
          'style-loader',
          'css-loader?sourceMap'
        ]
      },
      {
        test: /^((?!\.global).)*\.css$/,
        loaders: [
          'style-loader',
          'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]' // eslint-disable-line
        ]
      },
      // END STYLES
    ]
  },
  plugins: [
    // new webpack.NoEmitOnErrorsPlugin,
    // ENVIRONMENT
    new webpack.DefinePlugin({
      'process.env': PROCESS_ENV
    }),
    // TEMPLATE ENGINE
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
    }),
    // COPY FILES
    new CopyWebpackPlugin([
      // { from: 'src/favicon.ico' },
      // { from: 'src/robots.txt' },
      // { from: 'src/modules/scene/textures', to: 'assets/textures' },
    ]),
    // FIX FOR MISSING JQUERY DEPENDENCIES
    // new webpack.ProvidePlugin({
    //   $: 'jquery',
    //   jQuery: 'jquery',
    // }),
  ]
}
