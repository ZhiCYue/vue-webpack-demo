const merge = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const baseConfig = require('./webpack.config.base');
const config = require('../config');
const buildUtils = require('./build.utils');

module.exports = merge(baseConfig, {
    devtool: 'cheap-module-eval-source-map',
    // devtool: 'eval',
    output: {
        filename: 'js/[name].[chunkhash:7].js',
        path: buildUtils.rootResolve('dist'),
        // path: path.resolve(__dirname, '../back-end/app/static'),
        publicPath: (config.staticDomain || '').endsWith('/') ? config.staticDomain : `${config.staticDomain}/`
    },

    module: {
        // noparse: path.relolve(__dirname, './config'),
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: {
                    css: ExtractTextPlugin.extract({
                        use: 'css-loader',
                        fallback: 'vue-style-loader' // <- 这是vue-loader的依赖，所以如果使用npm3，则不需要显式安装
                    })
                }
            }
        },
        {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: {
                    loader: 'css-loader',
                    options: {
                        minimize: true
                    }
                }
            })
        },
        {
            test: /\.(png|jpeg|jpg|gif|svg|eot|svg|ttf|woff|woff2)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: 'assets/[name].[hash:7].[ext]'
                }
            }
        },
        ]
    },
    plugins: [
        new ExtractTextPlugin('css/[name].[chunkhash:7].css'),
        new webpack.DefinePlugin({
            ENVIRONMENT: JSON.stringify('test'),
        }),
        new HtmlWebpackPlugin({
            filename: 'templates/index.html',
            template: './app/templates/index.html'
        })
    ]
});
