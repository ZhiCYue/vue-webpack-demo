<template>
    <div>
        <sr-header title="test" class-namespace="ww">
            <div slot="prepend">
                sr-header
            </div>
            <div slot="append">
                www
            </div>
        </sr-header>
        <div>欢迎来到首页！！！</div>
        <button @click="loading()">Loading</button>
        <img class="home-img" src="./banner.jpg" />
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
      }, 10000);
    }
  }
};
</script>
<style scoped>
.home-img {
  width: 100%;
}
</style>