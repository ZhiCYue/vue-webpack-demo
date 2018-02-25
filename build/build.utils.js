const path = require('path');

/**
 * 根目录解析
 * @param {String} dir 目录
 */
exports.rootResolve = function (dir) {
    return path.join(__dirname, '..', dir);
};

