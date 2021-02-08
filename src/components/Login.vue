<template>
  <div class="login">
    <div class="main">
      <div class="t1">
        <label for="user">手机号</label>
        <input type="text" id="user" v-model="username" />
      </div>
      <div class="t1">
        <label for="pass">密码</label>
        <input type="password" id="pass" v-model="password" />
      </div>
      <div class="t1" v-show="isReg">
        <label>昵称</label>
        <input type="text" v-model="nickName" />
      </div>
      <div class="t1" v-show="isReg">
        <label>邮箱</label>
        <input type="email" v-model="email" />
      </div>
    </div>
    <div class="commit1" v-show="logShow" @click="loginClick">立即登录</div>
    <div class="commit2" v-show="regShow" @click="registerClick">注册账号</div>
  </div>
</template>

<script>
import $ from "jquery";
import { loginCheck, userRegister } from "../network/api";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      nickName: "",
      email: "",
      logShow: true,
      isReg: false,
      regShow:true
    };
  },
  computed: {
    active() {
      if (this.username && this.password && this.nickName && this.email) {
        return true;
      }
    },
  },
  methods: {
    async loginClick() {
      let { data } = await loginCheck({
        username: this.username,
        password: this.password,
      });
      if (data) {
        console.log(data);
        localStorage.setItem("token", data);
        this.$router.push("/home");
      }
    },
    registerClick() {
      this.logShow = false;
      if ($(".commit2").html() === "确认注册") {
        if (this.active) {
          userRegister({
            phone: this.username,
            password: this.password,
            nickName: this.nickName,
            email: this.email,
          }).then((res) => {
            if (res.errCode == 0) {
              this.$toast('注册成功')
              this.regShow=false
              this.isReg=false
              this.logShow=true
            }else{
              this.$toast('请输入正确的信息')
            }
          });
        } else {
          this.$toast('输入不能为空')
        }
      }
      $(".commit2")
        .css({ bottom: 20 })
        .html("确认注册");
      this.isReg = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  background: url("../assets/img/login.jpg") no-repeat;
  background-size: 100%;
  height: 100vh;
  z-index: 9999;
  position: absolute;
}

.main {
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translateX(-50%);

  div {
    width: 250px;
    height: 40px;
    line-height: 40px;
    border-radius: 30px;
    background: #ffcc33;
    margin-top: 20px;
    border: 1px solid #000;
    color: #000;
    font-weight: 500;
    display: flex;
    align-items: center;

    label {
      margin: 0 10px 0 20px;
    }

    input {
      height: 25px;
      border: none;
      width: 150px;
      background: none;
      font-size: 20px;
      outline: none;
    }
  }
}

.commit1,
.commit2 {
  height: 40px;
  line-height: 40px;
  font-size: 20px;
  border-radius: 25px;
  width: 150px;
  position: absolute;

  left: 50%;
  transform: translate(-50%);
  background: #4366fe;
  color: #fff;
  font-weight: 500;
  text-align: center;
  border: 1px solid #000;
}
.commit1 {
  bottom: 140px;
}
.commit2 {
  bottom: 80px;
}
</style>
