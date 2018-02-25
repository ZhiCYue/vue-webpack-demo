<template>
    <div class="bg">
        <div class="item" @click="showConfirm">pop showConfirm</div>
        <div class="item" @click="showTip">pop showTip</div>

        <div class="item" @click="showToast">show toast</div>

        <div class="item" @click="testAjax">testAjax</div>

        <mea-tip ref=tip></mea-tip>

    </div>
</template>

<script>
    import MeaTip from "@view-components/mea-tip";

    import system from "@/modules/api/system";

    export default {
        data(){
            return {}
        },
        methods: {
            showConfirm(){
                let self = this;
                self.$confirm({
                    text: "好像遇到高峰期了，要不您再试一次？",
                    cancelButtonText: "不用了",
                    okButtonText: '再试一次'
                }).then(()=>{
                    // 再试一次
                    
                }).catch(()=>{
                    // 不用了
                    
                });
            },
            showTip(){
                let tipText = "好像出问题喽，您可以错开高峰期再试试！或者联系我们在线客服。";
                this.$tip({
                    text: tipText
                }).then(()=>{
                    
                }).catch(()=>{

                })
            },
            showToast(){
                this.$toast("haha");
            },
            showShare(){
                let share = this.$share();
                // setTimeout(()=>{
                //     share.hide();
                // }, 5000)
            },
            testAjax(){
                let self = this;
                const ins = self.$loading();
                // 开始验证码读秒
                system.getRingList({
                    
                }).then(xhr => {
                    let resp = xhr.data;
                    ins.close();
                    alert(JSON.stringify(resp))
                    if(resp.retCode == "000000"){

                    }else{
                        
                    }
                }).catch((err) => {
                    
                    ins.close();
                });
            }
        },
        components:{
            'mea-tip': MeaTip
        }
    }
</script>

<style scoped>


.bg{
    background-color: #fff;
}

.item{
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
}


</style>