const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const PnpWebpackPlugin = require(`pnp-webpack-plugin`)
const distPath = path.resolve(__dirname, 'dist')


module.exports = {
  resolve: {
    extensions: ['.js', '.jsx'],
    plugins: [
      PnpWebpackPlugin,
    ]
  },
  resolveLoader: {
    plugins: [
      PnpWebpackPlugin.moduleLoader(module),
    ],
  },
  entry: {
    app: './src/index.js'
  },
  output: {
    path: distPath,
    filename: 'bundle.js',
    publicPath: '/',
    library: 'cra-react-cosmos',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /(node_modules\/(?!@fulgurit))/,
        loader: require.resolve('babel-loader'),
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: [
            require('@babel/plugin-proposal-class-properties'),
            require('@babel/plugin-syntax-dynamic-import'),
            require('@babel/plugin-proposal-export-namespace-from'),
            require('@babel/plugin-proposal-export-default-from'),
          ]
        }
      },
      {
        test: /\.css$/,
        use: require.resolve('css-loader'),
      },
      {
        test: /\.scss$/,
        loaders: [
          require.resolve('style-loader'),
          require.resolve('css-loader'),
        ],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      inject: 'body',
    }),
  ]
}
