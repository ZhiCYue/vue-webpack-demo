import PlayCore from "@view-components/mea-utils/playCore"

import playerService from "@view-components/mea-utils/playerService"
import scopeService from "@view-components/mea-utils/scopeService"

import Locache from "@/store/locache";

import global from "@/store/global";
import utils from "@view-components/mea-utils/utils";
import env from "@/pages/utils/env";


export default {
    data(){
        return {
            playCore: PlayCore,
            // 播放的状态 1表示播放，2代表暂停，3表示缓冲
            playState: 2, 
            playPercentCSS: {"width": '0%'},
            timeSytime: "0:00"
        }
    },
    methods:{
        /**
         * 初始化环境，如：初始化global.homePageUrl 值等
         */
        initEvn(){
            let self = this;
            // 初始化返回首页的地址，保存到全局变量中
            self.initHomePage();

            if(utils.is_weixin()){
                // 初始化微信环境
                env.initWeiXin(global.homePageUrl);
            }else{
                env.initQQ(global.homePageUrl);
            }
        },
        /**
         * 初始化主页地址，保存到全局变量global 中
         * 1. 旧的访问方式
         * 2. 新的访问方式
         */
        initHomePage(){
            let self = this;
            var address =  window.location.href.split('#')[0].split('?')[0];

            if(self.getQueryString('agentid') && self.getQueryString('groupid')){
                // 旧的访问地址，请求参数带有 agentid,groupid
                if(self.getQueryString("hash")){
                    global.homePageUrl =address +'?agentid='+self.getQueryString('agentid')+'&groupid='+self.getQueryString('groupid')+'&hash='+self.getQueryString("hash");
                }else{
                    global.homePageUrl =address +'?agentid='+self.getQueryString('agentid')+'&groupid='+self.getQueryString('groupid');
                }
            }else if(self.getQueryString("_c") && self.getQueryString("_au")){
                // 新的访问地址，请求参数带有 _c, _au
                if(self.getQueryString("hash")){
                    global.homePageUrl =address +'?_c='+self.getQueryString('_c')+'&_au='+self.getQueryString('_au')+'&hash='+self.getQueryString("hash");
                }else{
                    global.homePageUrl =address +'?_c='+self.getQueryString('_c')+'&_au='+self.getQueryString('_au');
                }
            }else{
                if(self.getQueryString("hash")){
                    global.homePageUrl =address + '?hash=' + self.getQueryString("hash");
                }else{
                    global.homePageUrl =address;
                }
            }
        },
        /**
         * 检查是否有铃音信息，来判断是否需要跳到首页
         */
        // hasRingInfo(){

        // },
        /**
         * 获取当前hash
         */
        getCurrentHash(){
            let hash = window.location.hash;
            return hash.substr(2);
        },
        /**
         * 返回上一个页
         */
        goBack(){
            window.history.go(-1)
        },
        /**
         * 跳转首页
         */
        goToIndex(){
            this.playCore.stopAll();

            // 如果是分享出去的铃音设置页面，则需要去除url中的ringid 、phoneno
            try {
                window.history.replaceState(null, null, this.removeUrlParam(location.href, 'hash'));
                window.history.replaceState(null, null, this.removeUrlParam(location.href, 'ringid'));
                window.history.replaceState(null, null, this.removeUrlParam(location.href, 'phoneno'));
            } catch(e) {

            }

            this.$router.push({'name': 'srindex'})
        },
        /**
         * 购买时登录页面
         */
        goToLogin(){
            this.playCore.stopAll();
            this.$router.push({'name': 'login'})
        },
        /**
         * 访问我的数据时的登陆页面
         */
        goToLoginHub(){
            this.$router.push({'name': 'loginHub'})
        },
        /**
         * result 结果页面
         */
        goToResult({success=true, orderId, isZero=false}){
            this.$router.push({'name': 'result', params: { 'success': success, 'orderId': orderId, 'isZero': isZero }})
        },
        /**
         * 输入关键字后，到搜索页面
         */
        goToSearch({keyWord="", searchType=0}){
            this.$router.push({'name': 'search', params: { 'keyWord': keyWord, 'searchType': searchType }})
        },
        /**
         * order 订单页面
         */
        goToOrder(){
            this.$router.push({'name': 'order'})
        },
        /**
         * pay 支付页面
         */
        goToPay(){
            this.$router.push({'name': 'pay'})
        },
        /**
         * TTS 制作页面
         */
        goToMake(){
            this.playCore.stopAll();
            this.$router.push({'name': 'make'})
        },
        /**
         * TTS 制作编辑页面
         */
        goToMakeEdit(){
            this.playCore.stopAll();
            this.$router.push({'name': 'edit'})
        },
        /**
         * 我的铃声页面
         */
        goToHistory(){
            let self = this;

            this.playCore.stopAll();

            let phoneNo = Locache.getUserPhone();
            if(phoneNo){
                // 已登录
                self.$router.push({"name": "ringhistory"});
            }else{
                // 未登录，跳转到登录页
                self.$router.push({"name": "loginHub", params:{"callBackHash": "ringhistory"}})
            }

        },
        /**
         * FAQ问答页
         */
        goToFaq(){
            this.playCore.stopAll();
            this.$router.push({'name': 'faq'})
        },
        /**
         * 计算铃音的实际支付价格
         * computeRealPrice
         */
        computeRealPrice(ringInfo, defaultPrice=0){
            // 说明：价格的优先级依次是：活动价、商品价、默认
            // 前端显示的活动价
            var showPrice = defaultPrice;  // 默认
            // 类型转换
            var activePrice = ringInfo.activePrice + "";
            var price = ringInfo.price + "";

            if(activePrice && ringInfo.activePrice != -1){
                // 配置了活动价，则展示活动价
                showPrice = (ringInfo.activePrice/100).toFixed(2);
            }else if(price && ringInfo.price != -1){
                // 没有配置活动价，但是配置了商品价
                showPrice = (ringInfo.price/100).toFixed(2);
            }
            // 零元不保留小数位
            if(showPrice == "0.00"){
                showPrice = "0";
            }
            // 格式化显示
            return showPrice;
        },
        /**
         * 计算铃音的描述信息
         */
        computeRealDesc(ringInfo){
            // 前端显示的提示信息
            var showText = "";
            // if(ringInfo.activeDesc && ringInfo.activeDesc != ""){
            //     // activeDesc 有内容，则显示内容
            //     showText = ringInfo.activeDesc;
            // }else{

                // 类型转换
                var price = ringInfo.price + "";

                if(price && ringInfo.price != -1){
                    var tmpPrice = (ringInfo.price/100).toFixed(2);
                    if(tmpPrice == "0.00") tmpPrice = "0";
                    showText = "原价" + tmpPrice + "元";
                }else{
                    return "原价199.00元";
                }
            // }
            return showText;
        },
        /**
         * 添加事件
         */
        addEvent(elem, type, fn) {
            if (elem.attachEvent) {
                elem.attachEvent('on' + type, fn);
                return;
            }
            if (elem.addEventListener) {
                elem.addEventListener(type, fn, false);
            }
        },
        /**
         * 解除事件
         */
        removeEvent(elem, type, fn){
            if (elem.detachEvent) {
                elem.detachEvent('on' + type, fn);
                return;
            }
            if (elem.removeEventListener) {
                elem.removeEventListener(type, fn, false);
            }
        },
        /**
         * 播放
         */
        doPlay(audioUrl){
            let scope = this;
            let $rootScope = this;

            playerService.btnClick(audioUrl, {
                "playState": scope.playState == 1,
                "playFn": function () {
                    scope.playState = 3;
                    // scopeService.safeApply(scope);
                },
                "pauseFn": function () {
                    scope.playState = 2;
                    // scopeService.safeApply(scope);
                    $rootScope.playPercentCSS = {"width": '0%'};
                    $rootScope.timeSytime = '0:00';
                    // scopeService.safeApply($scope);
                },
                "stopFn": function () {
                    scope.playState = 2;
                    scope.roundProgress = 0;
                    scope.timePosition = scope.timeDuration = '0:00';
                    // scopeService.safeApply(scope);
                    $rootScope.playPercentCSS = {"width": '0%'};
                    $rootScope.timeSytime = '0:00';
                    // scopeService.safeApply($scope);
                },
                "whileplayingFn": function (percent, position, duration, sytime) {
                    scope.playState = 1;
                    scope.timePosition = position['time'];
                    scope.timeDuration = duration['time'];

                    $rootScope.playPercentCSS={"width": percent.percent * 100 + '%'};
                    $rootScope.timeSytime = sytime['time'];

                    // scopeService.safeApply(scope);
                },
                "finishFn": function () {
                    scope.playState = 2;
                    scope.roundProgress = 0;
                    scope.timePosition = '0:00';
                    // scopeService.safeApply(scope);
                    $rootScope.playPercentCSS = {"width": '0%'};
                    $rootScope.timeSytime = '0:00';
                    // scopeService.safeApply($scope);
                },
                "errorFn": function () {
                    scope.playState = 2;
                    scope.roundProgress = 0;
                    scope.timePosition = scope.timeDuration = '0:00';
                    // scopeService.safeApply(scope);
                    $rootScope.playPercentCSS = {"width": '0%'};
                    $rootScope.timeSytime = '0:00';
                    // scopeService.safeApply($scope);
                }
            });
        },
        /**
         * 查询请求地址中的参数
         */
        getQueryString(name){
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        },
        /**
         * 删除url中的参数
         */
        removeUrlParam(url, delParam){
            var reg = new RegExp("(\\?|&)" + delParam + "=[^&#]*(&|#)?", 'g');

            return url.replace(reg, function (p0, p1, p2) {

                // if(p1 === '?' && p2 === '&') return '?';
                // if(p1 === '?' && p2 === '#') return '#';
                // if(p1 === '?' && p2 === '') return '';
                // if(p1 === '&' && p2 === '&') return '&';
                // if(p1 === '&' && p2 === '#') return '#';
                // if(p1 === '&' && p2 === '') return '';

                var _sep = p2 === '' ? '' : (p2 === '#' ? '#' : p1)

                return _sep;
            });
        }

    }
}