<template>
  <el-container>
    <el-main class="section text-center fang">
      <div class="bg-login">
        <el-tabs class="title">欢迎使用酒店预订</el-tabs>
      </div>
      <!-- <el-button circle :type="btnType" @click="loginBtn" class="loginbtn" :disabled="disabled">
          <i :class="iconstyle"></i>
        </el-button>
        <div class="register">
          <p>
            <router-link to="/register">注册账号</router-link>
          </p>
        </div> -->
    </el-main>
    <el-footer>
      <el-card class="box-card login-card">
        <div class="text item">
          <p class="login-title fang">登录</p>

          <el-form
            status-icon
            ref="ruleForm"
            label-width="80px"
            :model="ruleForm"
          >
            <el-form-item class="fang" label="手机号" prop="phone_number" required>
              <el-input
                v-model="ruleForm.phone_number"
                autocomplete="off"
                placeholder="请输入手机号"
              ></el-input>
            </el-form-item>
            <el-form-item class="fang" label="密码" prop="password" required>
              <el-input
                v-model="ruleForm.password"
                autocomplete="off"
                placeholder="请输入密码"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
      <!-- <el-button-group class="btn-grup"> -->
      <el-button
        type="btnType"
        @click="submitForm('ruleForm')"
        class="loginbtn fang"
        :disabled="disabled"
        ><i class="el-icon-s-custom"></i>登录</el-button
      >
      <router-link to="/register">
        <el-button type="btnType" class="register fang" :disabled="disabled"
          ><i class="el-icon-document"></i> 注册</el-button
        >
      </router-link>
      <!-- </el-button-group> -->
    </el-footer>
  </el-container>
</template>

<script>
import copyright from "@/components/copyright.vue";
import store from "./../store";
export default {
  data() {
    return {
      ruleForm: {
        phone_number: "",
        password: "",
      },
      rules: {
        phone_number: [
          { required: true, message: "请输入手机号", trigger: "change" },
        ],
        password: [
          { required: true, message: "请输入用户名", trigger: "change" },
        ],
      },
      iconstyle: "el-icon-right",
      disabled: false,
      btnType: "primary",
      isRealLogin: true,
    };
  },
  components: {
    copyright,
  },
  methods: {


    submitForm(formName) {
    //   this.axios.get("http://localhost:9091/customer/aaa",{
    //   params:{
    //     te:"12334"
    //   }
    // }).then((res) => {
    //   console.log(res);
    // });

      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios
            .post("http://localhost:9091/customerLogin", {
              phone_number: this.ruleForm.phone_number,
              password: this.ruleForm.password,
            })
            .then((res) => {
              console.log(res.data);
              if (res.data == true) {
                alert("登录成功");
                // this.iconstyle = "el-icon-check";
                // this.btnType = "success";
                setTimeout(() => {
                  this.$router.push("/findhotel");
                  this.$store.state.order.phone_number =
                    this.ruleForm.phone_number;
                }, 2000);
              } else {
                alert("用户名或密码错误");
              }
            })
            .catch((res) => {
              console.log(res);
              this.iconstyle = "el-icon-close";
              this.btnType = "danger";
              setTimeout(() => {
                this.disabled = false;
                this.iconstyle = "el-icon-right";
                this.btnType = "primary";
              }, 2000);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    // loginBtn() {
    //   this.iconstyle = "el-icon-loading";
    //   this.disabled = true;
    //   // console.log(this.login);
    //   this.axios
    //     .post("http://localhost:9091/customerLogin", {
    //       phone_number: this.login.phone_number,
    //       password: this.login.password,
    //     })
    //     .then((res) => {

    //       if (res.data.code == 200) {
    //         this.iconstyle = "el-icon-check";
    //         this.btnType = "success";
    //         setTimeout(() => {
    //           this.disabled = false;
    //           this.$store.commit("setFind");
    //           this.$router.push("/findroom");

    //         }, 2000);
    //       } else {
    //         this.iconstyle = "el-icon-close";
    //         this.btnType = "danger";
    //         setTimeout(() => {
    //           this.disabled = false;
    //           this.iconstyle = "el-icon-right";
    //           this.btnType = "primary";
    //         }, 2000);
    //       }
    //     })
    //     .catch((res) => {
    //       console.log(res);
    //       this.iconstyle = "el-icon-close";
    //       this.btnType = "danger";
    //       setTimeout(() => {
    //         this.disabled = false;
    //         this.iconstyle = "el-icon-right";
    //         this.btnType = "primary";
    //       }, 2000);
    //     });
    // },
    // nologinBtn() {
    //   this.$store.commit("setFind");
    //   this.$router.push("/findroom");
    // },
  },
};
</script>

<style scoped="scoped">
.text {
  font-size: 14px;
}

.index {
  padding: 0px;
  margin: 0px;
  height: 100%;
}
.item {
  /* padding: 18px 0; */
}

.login-card {
  width: 40%;
  margin: auto;
  margin-top: -14rem;
  /* background: #ffefa7; */
  background-color: rgba(194, 167, 255, 0.8);
  color: #ffefa7;
}

.btn-grup {
  margin: -18rem;
}
.login-title {
  font-size: 2rem;
  font-weight: lighter;
  margin-top: 1rem;
}

.title {
  font-family: fang;
  font-size: 5rem;
  font-weight: lighter;
  margin-top: 1rem;
  color: #d6a1e8;
  stroke-width: 4px;
}
.wrapper {
  min-height: 90vh;
}

.el-main {
  max-height: 90vh;
}

#app {
  overflow: hidden;
}

.loginbtn {
  width: 5rem;
  height: 2.5rem;
  font-size: 1rem;
  margin-top: 1rem;
  color: #0e0d0b;
  background: hsl(258, 70%, 72%);
}

.register {
  width: 5rem;
  height: 2.5rem;
  font-size: 1rem;
  margin-top: 1rem;
  color: #0e0d0b;
  background: hsl(258, 70%, 72%);
}

.register a,
.register div {
  color: #ffefa7;
}

.register p {
  margin: 0.5rem;
}
</style>
