<template>
    <div>
        <div>登陆页面</div>
        <input type="text" v-model="loginForm.username">
        <br/>
        <input type="password" v-model="loginForm.password">
        <button @click="login()">登陆</button>
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

</style>