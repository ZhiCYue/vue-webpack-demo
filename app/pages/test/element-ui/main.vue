<template>
    <div>
        <div>
          <el-button>默认按钮</el-button>
          <el-button type="success">成功按钮</el-button>
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
          <el-button type="primary" :loading="true">加载中</el-button>
          <el-button type="primary" disabled>主要按钮</el-button>
        </div>
        <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>

        <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="30%"
          @close="close"
          :before-close="handleClose">
          <span>这是一段信息</span>
          <span slot="title">Tip</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>

    </div>
</template>
<script>
  export default {
    data() {
      return {
        dialogVisible: false
      };
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      close(){
        console.log("close.")
      }
    }
  };
</script>