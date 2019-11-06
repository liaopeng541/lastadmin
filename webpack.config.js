var path = require('path')
var webpack = require('webpack')
const htmlWebpackPlugin = require("html-webpack-plugin")
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('./style/[name]-css.css');
const extractLESS = new ExtractTextPlugin('./style/[name]-less.css');
const extractSCSS = new ExtractTextPlugin('./style/[name]-scss.css');

const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length})

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'js/[name].js?[hash]',
    chunkFilename: 'js/[name].js?[hash]',
  },


  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {}
          // other vue-loader options go here
        }
      },
      {
        test: /\.css$/,
        use: extractCSS.extract(
          {
            fallback: "vue-style-loader",
            use: [
              'css-loader?importLoaders=1',
              'postcss-loader'
            ]
          }),
        exclude: path.resolve(__dirname, './node_modules/'),
        include: path.resolve(__dirname, './src/'),
      },
//添加对less和ttf的支持
      {
        test: /\.less$/,
        use: extractLESS.extract(
          {
            fallback: "style-loader",
            use: [
              'css-loader',
              'postcss-loader',
              'less-loader'
            ]
          }),
        exclude: path.resolve(__dirname, './node_modules/'),
        include: path.resolve(__dirname, './src/'),
      },
      {
        test: /\.scss$/,
        use: extractSCSS.extract(
          {
            fallback: "style-loader",
            use: [
              'css-loader',
              'postcss-loader',
              'sass-loader'
            ]
          }),
        exclude: path.resolve(__dirname, './node_modules/'),
        include: path.resolve(__dirname, './src/'),
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
          outputPath: './fonts',
        }
      },
      // {
      //   test: /\.js$/,
      //   loader: 'babel-loader',
      //   exclude: path.resolve(__dirname, './node_modules/'),
      //   include: path.resolve(__dirname, './src/'),
      //
      // },
      {
        test: /\.js$/,
        loader: 'happypack/loader?id=happy-babel-js',
        include: [path.resolve(__dirname, './src')],
        exclude: ["/node_modules/"]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
          outputPath: './images',
        }
      }
    ]
  },

  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@src': path.resolve(__dirname, './src'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@resource': path.resolve(__dirname, './src/resource')
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      jquery: "jquery",
      "window.jQuery": "jquery",
    }),
    extractCSS,
    extractLESS,
    extractSCSS,
    //根据html模板生成html
    new htmlWebpackPlugin({
      template: "index.html",
      filename: "index.html",
    }),
    //开启多线程进行打包
    new HappyPack({
      id: 'happy-babel-js',
      loaders: ['babel-loader?cacheDirectory=true'],
      threadPool: happyThreadPool
    })
  ],
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',
  externals: {
    'vue': 'Vue',
    'vuex': 'Vuex',
    'jquery': 'jQuery',
    'lodash': '_',
    'vue-router': 'VueRouter',
    'element-ui': 'ELEMENT',
    'viser-vue': 'ViserVue',
    'nprogress': 'NProgress',
    'node-uuid': 'UUID',
    'rxjs': 'rxjs'
  },
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
