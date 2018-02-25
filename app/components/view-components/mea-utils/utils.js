// 辅助工具

var exports = {};

//输出接口
exports.isBlank = isBlank;	// 判断字符串是否为空
exports.validatePhoneFormat = validatePhoneFormat;	// 手机号码格式验证
exports.validateSmsFormat = validateSmsFormat;		// 验证短信码验证
exports.validateEntFormat = validateEntFormat;		// 验证企业名称格式
exports.validateAdminFormat = validateAdminFormat;	// 验证管理员名称格式
exports.getLength = getLength;	// 获取字符串长度
exports.maxLenCheck = maxLenCheck;	// 最大长度检验
exports.encrypt = encrypt;	// 字符串加密函数
exports.getQueryString = getQueryString;     // 获取参数信息
exports.trim = trim;    //去除左右空格
exports.defaultString = defaultString;  // 默认字符串
exports.getSpPhoneNo = getSpPhoneNo;
exports.dateFormat = dateFormat;
exports.desEncrypt = desEncrypt;
exports.arrayContains = arrayContains;
exports.subStrCount = subStrCount;
exports.preventDefault=preventDefault;
exports.regexPhoneUtil=regexPhoneUtil;

/**
 * 判断字符串是否为空
 * @param  {string}  str 目标字符串
 * @return {Boolean}     true: 为空，false: 不为空
 */
function isBlank(str) {
    if (str == null || typeof str == 'undefined') {
        return true;
    }
    var trimStr = trim(str);
    if (!trimStr) {
        return true;
    } else {
        return false;
    }
}

/**
 * 去除左右空格
 * @param str
 * @returns {*|string|void|XML}
 */
function trim(str) {
    if (typeof str !== 'string') {
        return str;
    }
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

String.prototype.format = function(args) {
    var result = this;
    if (arguments.length > 0) {
        if (arguments.length == 1 && typeof(args) == "object") {
            for (var key in args) {
                if (args[key] != undefined) {
                    var reg = new RegExp("({" + key + "})", "g");
                    result = result.replace(reg, args[key])
                }
            }
        } else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] != undefined) {
                    var reg = new RegExp("({[" + i + "]})", "g");
                    result = result.replace(reg, arguments[i])
                }
            }
        }
    }
    return result
};

/**
 * 默认字符串
 * @param str
 * @param defaultStr
 * @returns {*}
 */
function defaultString(str, defaultStr) {
    defaultStr = defaultStr || "";
    if (str == null || typeof str === 'undefined' || trim(str) == '') {
        return defaultStr;
    } else {
        return str;
    }
}

function dateFormat(date, fmt) {
    // 对Date的扩展，将 Date 转化为指定格式的String
    // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
    // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
    // 例子：
    // (new Date()).format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
    // (new Date()).format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18

    if (!(date instanceof Date)) {
        return date;
    }

    var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "H+": date.getHours(), //小时
        "h+": date.getHours() % 12 || 12, //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}

/**
 * 获取运营商号码
 * @param operatorNodeName
 * @returns {*}
 */
function getSpPhoneNo(operatorNodeName) {
    var __operatorNodeName = operatorNodeName || '';
    if (__operatorNodeName.indexOf('移动') >= 0) {
        return '10086';
    } else if (__operatorNodeName.indexOf('电信') >= 0) {
        return '10000';
    } else if (__operatorNodeName.indexOf('联通') >= 0) {
        return '10010';
    } else {
        return '';
    }
}

/**
 * 手机号码格式验证
 * @param  {String} phone 手机号码
 * @return {Boolean}       验证结果
 */
function validatePhoneFormat(phone) {
    if (!phone || phone == '') {
        return false;
    }

    var reg = new RegExp((typeof phoneReg == 'undefined' ? '^\\d{11}\\d?$' : phoneReg), 'gi');
    if (reg.test(phone)) {
        return true;
    }
    return false;
}

/**
 * 手机号码格式验证
 * @param  {String} phone 手机号码
 * @return {Boolean}       验证结果
 */
function regexPhoneUtil(phone,reg) {
    if (!phone || phone == '') {
        return false;
    }

    var reg = new RegExp(reg);
    if (reg.test(phone)) {
        return true;
    }
    return false;
}

/**
 * 验证短信码验证
 * @param  {String} code 短信验证码
 * @return {Boolean}      验证结果
 */
function validateSmsFormat(code) {
    if (!code || code == '') {
        return false;
    }

    var reg = new RegExp('^\\d{4,6}$', 'gi');
    if (reg.test(code)) {
        return true;
    }
    return false;
}

/**
 * 验证企业名称格式
 * @param  {string} ent 企业名称
 * @return {Boolean}     验证结果
 */
function validateEntFormat(ent) {
    if (!ent || ent == '') {
        return false;
    }

    var reg = new RegExp('^[A-Za-z0-9_()（）\\-\\u4e00-\\u9fa5]{1,50}$', 'gi');
    if (reg.test(ent)) {
        return true;
    }
    return false;
}

/**
 * 验证管理员名称格式
 * @param  {string} admin 管理名称
 * @return {Boolean}     验证结果
 */
function validateAdminFormat(admin) {
    if (!admin || admin == '') {
        return false;
    }

    var reg = new RegExp('^[\\u4E00-\\u9FA5A-Za-z0-9]{1,16}$', 'gi');
    if (reg.test(admin)) {
        return true;
    }
    return false;
}

/**
 * 获取字符串长度
 * @param  {String} str 字符串
 * @return {Number}     字符串长度
 */
function getLength(str) {
    // 获得字符串实际长度，中文2，英文1
    var realLength = 0, len = str.length, charCode = -1;
    for (var i = 0; i < len; i++) {
        charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) realLength += 1;
        else realLength += 2;
    }
    return realLength;
}

/**
 * 字符串中子字符串的数量
 * @param subStr
 * @param str
 * @returns {number}
 */
function subStrCount(subStr, str) {
    var index = 0, sum = 0;

    if (!str || !subStr) {
        return 0;
    }

    index = str.indexOf(subStr);
    while (index > -1) {
        sum += 1;
        index = str.indexOf(subStr, index + 1);
    }
    return sum;
}

/**
 * 最大长度检验
 * @param  {String} str 字符串
 * @param  {Number} max 最大长度
 * @return {Boolean}     结果，true：没有超过最大长度，false：超过最大长度
 */
function maxLenCheck(str, max) {
    if (!str) {
        return false;
    }

    return getLength(str) <= max;
}

/**
 * 字符串加密函数
 * @param  {String} str 目标字符串
 * @return {String}     加密后的字符串
 */
function encrypt(str) {
    return des.Encrypt(str, '0123456789abcdef');
}

/**
 * 获取参数信息
 * @param  {String} paramName 参数名称
 * @param  {String} url  地址
 * @param  {String} modeName 模式名称，如果设置，以mode优先级最高，例如：aaa.com/mode/aa?mode=bb->(mode)->aa
 * @return {String}      参数值
 */
function getQueryString(paramName, url, modeName) {
    var tUrl = !url ? window.location.href : url;
    if (modeName) {
        var reg1 = new RegExp('/' + modeName + '/([^{\?|#}]*)({\?|#|$})', 'i');
        var m = tUrl.match(reg1);
        if (m && m[1])
            return m[1];
        m = getQueryString(paramName);
        if (m)
            return m;
        return null;
    } else {
        var reg2 = new RegExp('(^|&)' + paramName + '=([^&]*)(&|$)', 'i');
        if (!url) {
            var m2 = window.location.search.substr(1).match(reg2);
        }
        else {
            var m2 = url.match(reg2);
        }
        if (m2) return unescape(m2[2]);
        return null;
    }
}

function desEncrypt(str) {
    str = '' + str;
    var keyHex = CryptoJS.enc.Utf8.parse('!)@(#*$&');
    var encrypted = CryptoJS.DES.encrypt(str, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
}

function arrayContains(obj, arr) {
    var i = arr.length;
    while (i--) {
        if (arr[i] === obj) {
            return true;
        }
    }
    return false;
}

function preventDefault() {
    document.body.ontouchstart=preventDefaultFun;
    document.body.ontouchend=preventDefaultFun;
    document.body.onmousedown= preventDefaultFun;
    document.body.onmouseup= preventDefaultFun;
    document.body.onmousemove=preventDefaultFun;
    document.body.ontouchmove= preventDefaultFun;
    
}

function preventDefaultFun(event) {
    event.stopPropagation();
    event.preventDefault();
}

/**
 * 时间格式转换
 */
exports.formatDateTime = formatDateTime;
function formatDateTime(inputTime){
    var date = new Date(inputTime);  
    var y = date.getFullYear();    
    var m = date.getMonth() + 1;    
    m = m < 10 ? ('0' + m) : m;    
    var d = date.getDate();    
    d = d < 10 ? ('0' + d) : d;    
    var h = date.getHours();  
    h = h < 10 ? ('0' + h) : h;  
    var minute = date.getMinutes();  
    var second = date.getSeconds();  
    minute = minute < 10 ? ('0' + minute) : minute;    
    second = second < 10 ? ('0' + second) : second;   
    
    return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
}

/**
 * 获取当前时间 yyyyMMddHHMMSS
 * @returns {number}
 */
exports.getNowFormatDateName = getNowFormatDateName;
function getNowFormatDateName() {
    var date = new Date();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var minutes =  date.getMinutes();
    var hours = date.getHours();
    var seconds =  date.getSeconds();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    if (minutes >= 0 && minutes <= 9) {
        minutes = "0" + minutes;
    }
    if (hours >= 0 && hours <= 9) {
        hours = "0" + hours;
    }
    if (seconds >= 0 && seconds <= 9) {
        seconds = "0" + seconds;
    }

    return "" + month + strDate + hours + minutes + seconds;
}

/**
 * 判断是不是微信环境
 * @type {is_weixin}
 */
exports.is_weixin = is_weixin;
function is_weixin(){
    var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i)=="micromessenger") {
        return true;
    } else {
        return false;
    }
}

/**
 * 判断是不是IOS
 * @type {is_ios}
 */
exports.is_ios = is_ios;
function is_ios(){
    var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/\(i[^;]+;( u;)? cpu.+mac os x/)!=null||ua.match(/iphone/i)) {
        return true;
    } else {
        return false;
    }
}

export default exports;