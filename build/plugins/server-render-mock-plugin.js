// 此插件用于替换页面中的需要从后台加载数据的变量

const fs = require('fs');

function ServerRenderMockPlugin(options = {}) {
    if (!options.mockData && !options.mockFile) {
        throw Error('需要设置mockFile[mock的文件路径]和mockData[mock数据]');
    }

    function encodeRegexItem(val) {
        ['$', '{', '}', '(', ')', '[', ']', '^', '|'].forEach(item => {
            val = val.replace(new RegExp(`\\${item}`, 'g'), `\\${item}`)
        })

        return val;
    }

    // 替换标识符号
    this.replaceFlagPrefix = encodeRegexItem(options.replaceFlagPrefix || '@@');
    this.replaceFlagSubfix = encodeRegexItem(options.replaceFlagSubfix || '@@');

    // 正则表达式
    this.replacePattern = new RegExp(`${this.replaceFlagPrefix}([^@]+?)${this.replaceFlagSubfix}`);

    // 可以传入对象和字符串，如果传入对象，直接当作替换的源，如果是字符串，需要是json格式的数据
    // 如果传入mockData，以mockData为准
    this.mockData = typeof options.mockData === 'string' ? JSON.parse(options.mockData) : options.mockData;

    // mock文件地址，如果传入，文件中也需要是json对象
    // 如果mockData不存在，则使用mockFile
    if (!this.mockData) {
        this.mockData = JSON.parse(fs.readFileSync(options.mockFile));
    }
}

// 插件规定接口方法
ServerRenderMockPlugin.prototype.apply = function (compiler) {
    const self = this;

    compiler.plugin('compilation', function (compilation) {
        compilation.plugin('html-webpack-plugin-after-html-processing', function (options, callback) {
            // 替换变量
            let rs;
            while (rs = self.replacePattern.exec(options.html)) {
                options.html = options.html.replace(rs[0], self.mockData[rs[1]] || '');
            }

            callback(null, options);
        })
    })
}

module.exports = ServerRenderMockPlugin;