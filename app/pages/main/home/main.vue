<template>
  <div class="homeC">
        <el-container style="height:100%;">
          <el-header class="header-region">
            <!-- Header -->
            <div>
                物联网卡平台|管理系统
            </div>
          </el-header>
          <el-container>
            <el-aside width="200px" class="aside-region">
              <!-- Aside -->
              <el-menu :default-openeds="['1', '3']">
                <el-submenu class="submenu" index="1">
                  <template slot="title"><i class="el-icon-setting"></i>系统管理</template>
                  <el-menu-item-group>
                    <el-menu-item index="1-1">命令日志</el-menu-item>
                    <el-menu-item index="1-2">修改密码</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu class="submenu" index="2">
                  <template slot="title"><i class="el-icon-menu"></i>代理商管理</template>
                  <el-menu-item-group>
                    <el-menu-item index="2-1">代理商管理</el-menu-item>
                    <el-menu-item index="2-2">代理商金额变化</el-menu-item>
                    <el-menu-item index="2-3">代理商操作记录</el-menu-item>
                    <el-menu-item index="2-4">客户管理</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
              </el-menu>
            </el-aside>
            <el-main class="main-region">
              <!-- Main -->
              <div class="main-region-contain">
                <button @click="loading()">Loading</button>
              </div>
              
            </el-main>
          </el-container>
        </el-container>
  </div>
</template>
<script>
import SrHeader from "@share-components/sr-header";
export default {
  components: {
    SrHeader
  },
  methods: {
    loading() {
      const ins = this.$loading();

      setTimeout(() => {
        ins.close();
      }, 3000);
    }
  }
};
</script>
<style scoped>

.homeC {
  height: 100%;
}

.header-region {
  font-size: 26px;
  color: #fff !important;
  background-color: #6e6ed2 !important;
}

.aside-region {
  background-color: #444444 !important;
}

.main-region {
  background-color: #f4f4f4 !important;
}

.main-region-contain {
  padding: 10px;
  height: 100%;
  background-color: #fff !important;
  box-sizing: border-box;
}




  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    /*text-align: center;*/
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    /*text-align: center;*/
    line-height: 60px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
