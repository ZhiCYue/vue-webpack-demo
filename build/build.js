const rm = require('rimraf');
const path = require('path');
const webpack = require('webpack');
const ora = require('ora');
const chalk = require('chalk');

const profileConfigReplacer = require('./build.profile.config.replacer');
const buildUtils = require('./build.utils');
const localServer = require('./build.local.server');

// 获取构建的profile值
const profile = process.argv[2];

const profile_path_prefix = path.join('D:/GIT_CTI_MEA/dev/profile-meap');

profiles = {
    local: {
        profileFiles: [profile_path_prefix + '/local/meap-spread/website.properties'],
        webpackConfig: 'webpack.config.local.js'
    },
    development: {
        profileFiles: [profile_path_prefix + '/development/meap-spread/website.properties'],
        webpackConfig: 'webpack.config.development.js'
    },
    test: {
        profileFiles: [profile_path_prefix + '/test/meap-spread/website.properties'],
        webpackConfig: 'webpack.config.test.js'
    },
    production: {
        profileFiles: [profile_path_prefix + '/production/meap-spread/website.properties'],
        webpackConfig: 'webpack.config.production.js'
    }
};

if (!Object.keys(profiles).includes(profile)) {
    throw 'profile的值不正确';
}

const isLocalEnv = profile === 'local';

// 设置环境变量
process.env.NODE_ENV = profile

// 先进行config替换，生成index.js文件
profileConfigReplacer(profiles[profile].profileFiles);

const webpackConfig = require(`./${profiles[profile].webpackConfig}`);

const spinner = ora(`正在进行 ${profile} 环境构建...`);
spinner.start();

// 删除dist
rm(buildUtils.rootResolve('dist'), (err, stats) => {
    if (err) throw err;
    const compiler = webpack(webpackConfig, (err, stats) => {
        spinner.stop();
        if (err) throw err;
        
        console.log(chalk.cyan('  构建完成\n'));

        if (isLocalEnv) {
            localServer(compiler, webpackConfig);
        }
    });
});
