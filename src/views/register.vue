<template>
  <div>
    <el-container class="wrapper fang">
      <el-main class="section text-center">
        <div class="bg-login"></div>
        <el-card class="box-card register-card">
          <div class="text item">
            <p class="register-title">账号注册</p>
            <el-form :model="register" status-icon ref="register" label-width="80px">
              <el-form-item label="昵称" prop="customer_name" required>
                <el-input type="text" v-model="register.customer_name" placeholder="输入昵称"></el-input>
              </el-form-item>
              <el-form-item label="手机号码" prop="phone_number" required>
                <el-input type="text" v-model="register.phone_number" placeholder="输入手机号码(11位)"></el-input>
              </el-form-item>
              <el-form-item label="身份证号" prop="customer_id_number" required>
                <el-input type="text" v-model="register.customer_id_number" placeholder="输入身份证号码"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password" required>
                <el-input type="password" v-model="register.password" placeholder="输入密码"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="confirm" required>
                <el-input type="password" v-model="register.confirm" placeholder="请确认密码"></el-input>
              </el-form-item>
            </el-form>
            <el-button :type="btnType" @click="registerBtn('register')" class="registerbtn" :disabled="disabled">
              <i :class="iconstyle"></i> 注册账号
            </el-button>
            <el-button @click="resetForm('register')">重置</el-button>
          </div>
        </el-card>

        <div class="register">
          <p>
            <router-link to="/login">已有账号？立即登录</router-link>
          </p>
        </div>
      </el-main>
    </el-container>
    <el-footer class="footer text-center">
      <copyright></copyright>
    </el-footer>
  </div>
</template>

<script>
  import copyright from "@/components/copyright.vue";
  import store from './../store';
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.register.checkPass !== '') {
            this.$refs.register.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.register.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        register: {
          customer_name: '',
          password: '',
          confirm: '',
          phone_number: '',
          customer_id_number:''
        },
        iconstyle: 'el-icon-document-checked',
        disabled: false,
        btnType: 'primary',
        isRealRegister: false,
        rules: {
          customer_name:[{ required: true, message: "请输入姓名", trigger: "change"}],
          phone_number:[{ required: true, message: "请输入手机号", trigger: "change"}],
          customer_id_number:[{ required: true, message: "请输入身份证号", trigger: "change"}],
          password: [{
            required:true,
            validator: validatePass,
            trigger: 'blur'
          }],
          confirm: [{
            required:true,
            validator: validatePass2,
            trigger: 'blur'
          }],
        }
      }
    },
    components: {
      copyright,
    },
    methods: {
      resetForm(register) {
        // console.log(this.$refs[register]);
        this.$refs[register].resetFields();
      },
      registerBtnTest(register) {
        // console.log(this.$refs[register].validate);
        this.$refs[register].validate((valid) => {
          if (valid) {
            alert("valid")
            console.log(this.register);
          } else {
            console.log("err");
            alert("error")
            return false;
          }
        })
      },
      registerBtn(register) {

        this.$refs[register].validate((valid) => {
          if (valid) {
            alert("valid")
            // this.iconstyle = "el-icon-loading";
            // this.disabled = true;
            this.axios.post("http://localhost:9091/customer/register", {

                "customer_name": this.register.customer_name,
                "password": this.register.password,
                "phone_number": this.register.phone_number,
                "customer_id_number":this.register.customer_id_number
              })
              .then(res => {
                console.log(res.data)
                if (res.data == true) {
                  console.log("into true")
                  setTimeout(() => {
                    this.disabled = false;
                    this.$router.push("/login");
                  }, 2000);
                  this.iconstyle = "el-icon-check";
                  this.btnType = "success";
                  // setTimeout(() => {
                  //   this.disabled = false;
                  //   this.$router.push("/login");
                  // }, 2000);
                } else {
                  alert("用户已存在")
                  // this.iconstyle = "el-icon-close";
                  // this.btnType = "danger";
                  // setTimeout(() => {
                  //   this.disabled = false;
                  //   this.iconstyle = "el-icon-document-checked";
                  //   this.btnType = "primary";
                  // }, 2000);
                }
              })
              .catch(res => {
                console.log(res);
                this.iconstyle = "el-icon-close";
                this.btnType = "danger";
                setTimeout(() => {
                  this.disabled = false;
                  this.iconstyle = "el-icon-document-checked";
                  this.btnType = "primary";
                }, 2000);
              })
          } else {
            console.log('error submit!!');
            this.iconstyle = "el-icon-close";
            this.btnType = "danger";
            setTimeout(() => {
              this.disabled = false;
              this.iconstyle = "el-icon-document-checked";
              this.btnType = "primary";
            }, 2000);
            return false;
          }
        });
      },
    }
  }
</script>

<style scoped="scoped">
  .text {
    font-size: 14px;
  }

  .item {
    /* padding: 18px 0; */
  }

  .register-card {
    /* margin: -5rem 1rem 1rem 1rem; */
    width: 40%;
    margin: auto;
    margin-top: -40rem;
    /* background: #ffefa7; */
    background-color: rgba(194, 167, 255, 0.8);
    color: #ffefa7;
  }

  .register-title {
    font-size: 2rem;
    font-weight: lighter;
    margin-top: 1rem;
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

  .registerbtn {
    /* margin-top: 2rem; */
  }

  .register a,
  .register div {
    color: #409EFF;
  }

  .register p {
    margin: 0.5rem;
  }
</style>
