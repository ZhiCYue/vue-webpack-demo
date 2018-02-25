const fs = require('fs');
const rm = require('rimraf');
const PropertiesReader = require('properties-reader');
const buildUtils = require('./build.utils');

const CONFIG_PATH = buildUtils.rootResolve('config');

const configTemplate = require(`${CONFIG_PATH}/index.template`);

const pattern = /@([^@]+?)@/;

function configReplacer(profilePaths) {
    // 需要设置成同步删除模式
    rm.sync(`${CONFIG_PATH}/index.js`);

    const properties = PropertiesReader();

    profilePaths.forEach((profile) => {
        properties.append(profile);
    }, this);

    const configs = {};

    for (const k in configTemplate) {
        const rs = pattern.exec(configTemplate[k]);
        if (rs) {
            configs[k] = configTemplate[k].replace(rs[0], properties.get(rs[1]));
        } else {
            configs[k] = configTemplate[k];
        }
    }

    let configStr = JSON.stringify(configs, undefined, 4);
    configStr = `module.exports = ${configStr};`;

    fs.writeFileSync(`${CONFIG_PATH}/index.js`, configStr, {
        encoding: 'utf8'
    });
}

module.exports = configReplacer;