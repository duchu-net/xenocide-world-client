import webpack from 'webpack';
import path from 'path';
import baseConfig from './webpack.config.base';
// import BabiliPlugin from 'babili-webpack-plugin';
// import Config from './config/app';
// import nodeExternals from 'webpack-node-externals'
// import pkg from './package.json';


const plugins = [];
// if (Config.get('prod.minifi')) {
//   // plugins.push(new BabiliPlugin({
//   //   // NOT WORKING! WORKAROUND: ADD "plugins": ["transform-remove-console"] TO .babelrc
//   //   // removeConsole: true,
//   // }, {
//   //   comments: true
//   // }));
//   plugins.push(new webpack.optimize.UglifyJsPlugin({
//     compress: {
//       warnings: false,
//     },
//     comments: false,
//   }));
// }


export default {
  ...baseConfig,
  entry: [
    path.resolve(__dirname, '../src/index.js'),
    // bundle: path.resolve(__dirname, 'src/index.js'),
    // vendor: Object.keys(pkg.dependencies),
  ],
  output: {
    ...baseConfig.output,
    // filename: '[name].[chunkhash].js',
  },
  module: {
    ...baseConfig.module,
    loaders: [
      ...baseConfig.module.loaders,
    ]
  },
  // externals: [nodeExternals({ whitelist: ['duchunet-web-client', 'duchunet-utils'] })],
  plugins: [
    ...baseConfig.plugins,
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
    }),
    // ...plugins,
  ]
};
