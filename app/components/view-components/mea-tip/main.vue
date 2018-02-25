<template>
    <div>
        <!-- 弹框，两个按钮 -->
        <div class="pop-box-tip" v-if="visible">
            <img class="img-tip" src="./images/ico_shibai@-3.png">
            <a class="close" @click="close"></a>
            <div class="title" v-text="modalOptions.text">是否删除该铃音？</div>
            <div class="operate">
                <div class="button" v-text="modalOptions.buttonText" @click="ok">确认</div>
            </div>
        </div>
        <div class="mask" v-if="visible"></div>

    </div>
</template>

<script>
    import Vue from 'vue';

    var _def = {
        text: "My dialog",
        showButton: true,
        buttonText: '知道了',
        callbackFun(){}
    };

    let component = Vue.extend({ 
        data(){
            return {
                visible: false,
                modalOptions: Object.assign({}, _def)
            }
        },
        computed: {
            
        },
        methods:{
            isClosed(){
                return !this.visible;
            },
            reSet(){
                this.modalOptions = Object.assign({}, _def)
            },
            close(){
                this.visible = false;
                this.reSet();
            },
            ok(){
                this.modalOptions.callbackFun(true);
            },
            show(options, cb){
                if(options){
                    var defaultOptions = this.modalOptions;
                    for(let c in defaultOptions){
                        if(options.hasOwnProperty(c)){
                            defaultOptions[c] = options[c]
                        }
                    }
                }

                defaultOptions.callbackFun = cb ? cb : function(){};
                this.visible = true;
            }
        }
    })

    export default component;
</script>

<style scoped>

.mask{
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.7);
    bottom: 0;
    left: 0;
    z-index: 1000;
    opacity: .5;
    position: fixed;
}

/**
 * 弹框
 */

.pop-box-tip{
    width: 8rem;
    background-color: #FFF;
    margin: 0 auto;
    border-radius: 10px;
    color: #000;
    font-size: 14px;
    text-align: center;
    position: fixed;
    top: 5rem;
    left: 1rem;
    z-index: 2000;
} 

.pop-box-tip .close{
    position: absolute;
    right: 10px;
    top: 10px;
    width: 14px;
    height: 14px;
    background-image: url("./images/but_guanbi_nor@.png");
    background-size: contain;
    background-repeat: no-repeat;
}

.pop-box-tip .close:hover{
    background-image: url("./images/but_guanbi_sel@.png");
}

.pop-box-tip .close:hover{
    background-image: url("./images/but_guanbi_sel@.png");
}


.pop-box-tip .title{
    font-family: "PingFang";
    font-size: 16px;
    color: rgb(78,75,82);
    text-align: center;
    line-height: 20px;
    margin: 20px 16px;
}

.pop-box-tip .operate .button{
    -webkit-box-flex: 1;
    width: 2.933rem;
    height: 1rem;
    line-height: 1rem;
    font-size: 18px;
    color: #fff;
    border-radius: 18px;
}

.pop-box-tip .operate{
    display: -webkit-box;
    background-color: rgb(72,131,255);
    margin-left: 0.8rem;
    margin-right: 0.8rem;
    border-radius: 18px;
    margin-bottom: 20px;
}

.img-tip{
    margin: 25px auto 0 auto;
    width: 92px;
}

</style>
