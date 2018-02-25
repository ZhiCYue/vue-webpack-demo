const opn = require('opn');
const express = require('express');
const proxyMiddleware = require('http-proxy-middleware');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const buildUtils = require('./build.utils');

const DEV_CONFIG = {
    port: 9999,
    proxyTable: {
        '/api': {
            target: 'http://localhost:9999',
            changeOrigin: true
        }
    },
    autoOpenBrowser: true
};

const app = express();

/* datura接口 20170302 */
var appData = require('../jsonData/ringList.json')  /* ringList.json数据文件 */
// var ringList = appData.ringList   /* ringList.json文件文件下的.ringList数据赋值给变量ringList */
var apiRoutes = express.Router()  /* 定义express.Router() 对象 */
apiRoutes.get('/ringList', function(req, res){   /* 定义接口并返回数据 */
    res.json({
        data: appData
    })
})
app.use('/api', apiRoutes)  /* 定义接口在/api目录下，方便管理 */
/* datura接口 _end */

module.exports = function (compiler, compilerConfig) {
    
    const devMiddleware = webpackDevMiddleware(compiler, {
        publicPath: compilerConfig.output.publicPath,
        quiet: true
    });

    const hotMiddleware = webpackHotMiddleware(compiler, {
        log: () => {}
    });

    // html-webpack-plugin 编译文件结束后触发重新加载页面
    compiler.plugin('compilation', function (compilation) {
        compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
            hotMiddleware.publish({
                action: 'reload'
            })
            cb()
        })
    })

    // 代理API请求的处理
    Object.keys(DEV_CONFIG.proxyTable).forEach((context) => {
        let options = DEV_CONFIG.proxyTable[context];
        if (typeof options === 'string') {
            options = {
                target: options
            };
        }
        app.use(proxyMiddleware(options.filter || context, options));
    });

    // 开发服务
    app.use(devMiddleware);

    // 热加载
    app.use(hotMiddleware);

    app.use(express.static(buildUtils.rootResolve('dist')));

    const uri = `http://localhost:${DEV_CONFIG.port}`;

    console.log('> 正在启动服务...');
    devMiddleware.waitUntilValid(() => {
        console.log(`> Listening at ${uri}\n`);
        if (DEV_CONFIG.autoOpenBrowser) {
            opn(uri);
        }
    });

    app.listen(DEV_CONFIG.port);
};