<template>
    <div class="loginC">
        <input type="text" v-model="loginForm.username"/>
        <input type="password" v-model="loginForm.password">
        <button @click="login()">登陆</button>
        <img class="home-img" src="./banner.jpg" />
    </div>
</template>
<script>
import systemModule from "@/modules/api/system";

export default {
  data: function() {
    return {
      loginForm: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      systemModule
        .login({
          username: this.loginForm.username,
          password: this.loginForm.password,
          code: "1234"
        })
        .then(xhr => {
          let resp = xhr.data;
        })
        .catch(() => {
          console.log("error");
          this.$router.push("/");
        });
    }
  }
};
</script>
<style scoped>

.loginC{
  position: relative;
  height: 100%;
}

.home-img {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
}

div input{
  margin: 20px;
  border: 1px solid #000000;
}

</style>