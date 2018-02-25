// 此插件用于增加jsp头

function JspHeaderPlugin(options = {}) {
    this.header = '<%@ page language="java" pageEncoding="UTF-8" %>\n<%@ page trimDirectiveWhitespaces="true" %>\n'
}

// 插件规定接口方法
JspHeaderPlugin.prototype.apply = function (compiler) {
    const self = this;

    compiler.plugin('compilation', function (compilation) {
        compilation.plugin('html-webpack-plugin-after-html-processing', function (options, callback) {
            options.html = self.header + options.html;

            callback(null, options);
        })
    })
}

module.exports = JspHeaderPlugin;