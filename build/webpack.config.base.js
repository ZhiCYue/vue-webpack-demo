const webpack = require('webpack');

const buildUtils = require('./build.utils');

module.exports = {
    entry: {
        main: './app/main.js'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            vue$: 'vue/dist/vue.esm.js',
            '@': buildUtils.rootResolve('app'),
            '@share-components': buildUtils.rootResolve('app/components/shared-components'),
            '@view-components': buildUtils.rootResolve('app/components/view-components'),
            '#config$': buildUtils.rootResolve('config'),
        }
    },
    module: {
        rules: [{
            test: /\.js/,
            use: 'babel-loader',
            exclude: [/node_modules/]
        }]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            minChunks: function (module, count) {
                return module.resource && (/reset.css/).test(module.resource);
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module, count) {
                return module.resource && (/node_modules/).test(module.resource);
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['manifest']
        })
    ],

};