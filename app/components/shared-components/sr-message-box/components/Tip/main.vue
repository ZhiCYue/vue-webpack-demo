<template>
    <div>
        <!-- 弹框，两个按钮 -->
        <div class="pop-box-tip" v-if="show">
            <img v-if="modalOptions.type=='fail'" class="img-tip" src="./images/ico_shibai@-3.png">
            <a class="close" @click="cancel"></a>
            <div class="title" v-text="modalOptions.text"></div>
            <div class="operate">
                <div class="button" v-text="modalOptions.buttonText" @click="success">确认</div>
            </div>
        </div>
        <div class="mask" v-if="show"></div>

    </div>
</template>

<script>
    import Vue from 'vue';

    var _def = {
        text: "出错了！",
        buttonText: '知道了',
        type: 'fail'
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
