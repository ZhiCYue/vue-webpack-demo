<template>
    <div>
        <!-- 弹框，两个按钮 -->
        <div class="pop-box-confirm" v-if="show">
            <a class="close" v-show="modalOptions.showClose" @click="cancel"></a>
            <img v-if="modalOptions.icon" class="img-tip" src="./images/ico_shibai@-1.png">
            <div class="title" v-text="modalOptions.text">是否删除该铃音？</div>
            <div class="operate">
                <div class="btn btn-cancel" v-text="modalOptions.cancelButtonText" @click="cancel">取消</div>
                <div class="btn btn-ok" v-text="modalOptions.okButtonText" @click="success">确认</div>
            </div>
        </div>

        <div class="mask" v-if="show"></div>

    </div>
</template>

<script>
    import Vue from 'vue';

    var _def = {
        text: "My dialog",
        cancelButtonText: "取消",
        okButtonText: '确认',
        icon: false,
        showClose: true
    };

    let component = Vue.extend({ 
        data(){
            return {
                show: false,
                modalOptions: Object.assign({}, _def)
            }
        },
        computed: {
            
        },
        methods:{
            cancel(){
                this.show = false;
            },
            success(){
                this.show = false;
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

.img-tip {
    margin: 0 auto;
    width: 92px;
}

.pop-box-confirm{
    width: 8rem;
    padding: 20px 0 20px 0px;
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

.pop-box-confirm .close{
    position: absolute;
    right: 10px;
    top: 10px;
    width: 14px;
    height: 14px;
    background-image: url("./images/but_guanbi_nor@.png");
    background-size: contain;
    background-repeat: no-repeat;
}

.pop-box-confirm .close:hover{
    background-image: url("./images/but_guanbi_sel@.png");
}

.pop-box-prompt .close:hover{
    background-image: url("./images/but_guanbi_sel@.png");
}


.pop-box-confirm .title{
    font-family: "PingFang";
    font-size: 12px;
    color: rgb(78,75,82);
    text-align: center;
    line-height: 20px;
    margin: 20px 16px 14px 16px;
}

.pop-box-confirm .operate{
    
}

.pop-box-confirm .operate .btn{
    font-size: 16px;
    color: #fff;
    border-radius: 18px;
    width: 40%;
    line-height: 37px;
    height: 37px;
    display: inline-block;
}

.pop-box-confirm .operate .btn-cancel{
    background-color: rgb(193,193,193);
    margin-right: 5px;
}

.pop-box-confirm .operate .btn-ok{
    background-color: rgb(72,131,255);
    margin-left: 5px;
}

</style>
