const Encore = require('@symfony/webpack-encore')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const HtmlWebpackInjector = require('html-webpack-injector')
const path = require('path')
const fs = require('fs')

Encore
  .disableSingleRuntimeChunk()
  .splitEntryChunks()

  .setOutputPath('public/')
  .setPublicPath('/')
  .setManifestKeyPrefix('')

  .cleanupOutputBeforeBuild()

  .enableSourceMaps(!Encore.isProduction())
  .enableVersioning(Encore.isProduction())

  .addEntry('js/app', './src/scripts/app.js')
  .addStyleEntry('css/main', './src/styles/main.scss')

  .enableSassLoader()
  .enablePostCssLoader()

  .configureFilenames({
    js: process.env.production ? '[name].[contenthash].js' : '[name].[hash:8].js',
    css: process.env.production ? '[name].[contenthash].css' : '[name].[hash:8].css',
    fonts: 'fonts/[name].[hash:8].[ext]',
    images: 'images/[name].[hash:8].[ext]'
  })

  .addLoader({
    test: /\.twig$/,
    exclude: /node_modules/,
    use: [
      'twig-loader',
      'extract-loader',
      'html-loader'
    ]
  })

  .configureUrlLoader({
    images: {
      limit: 1024,
      esModule: false
    }
  })

  .configureTerserPlugin(function (options) {
    options.extractComments = false
    options.cache = false
    options.parallel = true
    options.terserOptions = {
      keep_classnames: false,
      mangle: true,
      compress: false,
      keep_fnames: false,
      output: {
        comments: false
      }
    }
  })

const twigDirectory = path.resolve(__dirname, 'src/templates/pages')
const pages = fs.readdirSync(twigDirectory)

for (const page of pages) {
  Encore.addPlugin(new HtmlWebPackPlugin({
    filename: page.replace('.twig', '.html'),
    template: `${twigDirectory}/${page}`,
    minify: {
      collapseWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      useShortDoctype: true
    },
    nodeModules: false,
    hash: true,
    cache: false
  }))
}

Encore.addPlugin(new HtmlWebpackInjector())

if (process.env.ANALYZE) {
  Encore.addPlugin(new BundleAnalyzerPlugin())
}

module.exports = Encore.getWebpackConfig()
