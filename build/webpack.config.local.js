const merge = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ServerRenderMockPlugin = require('./plugins/server-render-mock-plugin');
const baseConfig = require('./webpack.config.base');
const buildUtils = require('./build.utils');

// 添加hmr事件流
Object.keys(baseConfig.entry).forEach(function (name) {
    baseConfig.entry[name] = ['./build/build.local.client'].concat(baseConfig.entry[name])
})

module.exports = merge(baseConfig, {
    // devtool: 'cheap-module-eval-source-map',
    devtool: 'eval',
    output: {
        filename: 'js/[name].[hash].js',
        path: buildUtils.rootResolve('dist'),
        // path: path.resolve(__dirname, '../back-end/app/static'),
        publicPath: '/'
    },
    module: {
        rules: [{
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
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
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        interpolate: 'require'
                    }
                }
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            ENVIRONMENT: JSON.stringify('local'),
        }),
        new webpack.HotModuleReplacementPlugin(),
        new ServerRenderMockPlugin({
            replaceFlagPrefix: '${',
            replaceFlagSubfix: '}',
            mockData: {
                test: 'this is test',
                aaa: 'this is aaa',
                ddd: 'this is ddd'
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'templates/index.html',
            template: './app/templates/index.html'
        })
    ]
});