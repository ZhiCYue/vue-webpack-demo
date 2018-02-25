export default {
    /**
     * 获取class的完整名称
     * @param {String} baseClassName 基础类名
     * @param {String} classNamespace 类命名空间
     * @param {String} classSubfix 类后缀
     */
    getFullClassName(baseClassName, classNamespace, classSubfix) {
        return `${classNamespace}-${baseClassName}${
            classSubfix === '' ? '' : `___${classSubfix.trim()}`}`;
    }
};
