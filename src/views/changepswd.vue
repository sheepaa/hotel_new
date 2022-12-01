<template>
  <div>
    <el-container class="wrapper">
      <el-main class="section text-center">
        <el-card class="box-card changepswd-card">
          <div class="text item">
            <p class="changepswd-title">修改密码</p>
            <el-form :model="changepswd" status-icon ref="changepswd" label-width="80px">
              <el-form-item label="原密码" prop="old">
                <el-input type="password" v-model="changepswd.old" suffix-icon="el-icon-unlock"></el-input>
              </el-form-item>
              <el-form-item label="新密码" prop="new">
                <el-input type="password" v-model="changepswd.new" suffix-icon="el-icon-lock"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="confirm">
                <el-input type="password" v-model="changepswd.confirm" suffix-icon="el-icon-lock"></el-input>
              </el-form-item>
            </el-form>
            <el-button :type="btnType" @click="changepswdBtn" class="changepswdbtn" :disabled="disabled">
              <i :class="iconstyle"></i> 确认修改
            </el-button>
            <el-button @click="back" type="danger">返回</el-button>
          </div>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import footbar from "@/components/footbar.vue";
  import store from './../store';
  export default {
    data() {
      return {
        changepswd: {
          old: '',
          new: '',
          confirm: '',
        },
        iconstyle: 'el-icon-document-checked',
        disabled: false,
        btnType: 'primary',
        isRealchangepswd: false,
      }
    },
    components: {
      footbar,
    },
    mounted(){
      this.$store.commit("setMine");
    },
    methods: {
      back() {
        this.$router.push("/mine");
      },
      changepswdBtn() {
        this.iconstyle = "el-icon-loading";
        this.disabled = true;
        this.axios.post("http://localhost:8090/user/updatePassword", {
          "oldPassword": this.changepswd.old,
          "newPassword": this.changepswd.new,
        })
        .then(res => {
          this.iconstyle = "el-icon-check";
          this.btnType = "success";
          setTimeout(() => {
            this.disabled = false;
            this.$router.push("/mine");
          }, 2000);
        })
        .catch(res => {
          this.iconstyle = "el-icon-close";
          this.btnType = "danger";
          setTimeout(() => {
            this.disabled = false;
            this.iconstyle = "el-icon-document-checked";
            this.btnType = "primary";
          }, 2000);
        })
      },
    },
  }
</script>

<style scoped="scoped">
  
  .text {
    font-size: 14px;
  }
  
  .item {
    /* padding: 18px 0; */
  }
  
  .changepswd-card {
    margin: 9rem 9rem 1rem 9rem;
  }
  
  .changepswd-title {
    font-size: 2rem;
    font-weight: lighter;
    margin-top: 1rem;
  }
  
  .wrapper {
    min-height: 94vh;
  }
  
  .el-main {
    max-height: 94vh;
  }
  
  #app {
    overflow: hidden;
  }
  
  .changepswdbtn {
    /* margin-top: 2rem; */
  }
  
  .changepswd {
    margin-top: 5vh;
  }
  
  .changepswd a, .changepswd div {
    color: #409EFF;
  }
  
  .changepswd p {
    margin: 0.5rem;
  }
</style>
