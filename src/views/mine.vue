<template>
  <div>
    <el-container class="wrapper">
      <el-main class="section text-left">
        <div class="mine-bg"></div>
        <el-card class="box-card mine-card">
          <div class="text item">
            <el-row>
              <el-col :span="6" class="text-right">
                <img src="../assets/img/lk.jpg" class="avatar" />
              </el-col>
              <el-col :span="18">
                <p class="userid">ID: {{userdata.id}}</p>
              </el-col>
            </el-row>
          </div>
        </el-card>
        <el-card class="box-card mine-card-tool">
          <div class="text item">
            <el-row>
              <el-col :span="6" class="text-center">
                <router-link to="/history" class="text-plain">
                  <p class="tool-icon">
                    <i class="el-icon-tickets order"></i>
                  </p>
                  <p class="tool-text">
                    我的订单
                  </p>
                </router-link>
              </el-col>
              <el-col :span="6" class="text-center">
                <router-link to="/checkinfo" class="text-plain">
                  <p class="tool-icon">
                    <i class="el-icon-user info"></i>
                  </p>
                  <p class="tool-text">
                    我的信息
                  </p>
                </router-link>
              </el-col>
              <el-col :span="6" class="text-center">
                <router-link to="/changepswd" class="text-plain">
                  <p class="tool-icon">
                    <i class="el-icon-setting password"></i>
                  </p>
                  <p class="tool-text">
                    设置
                  </p>
                </router-link>
              </el-col>
              <el-col :span="6" class="text-center">
                <router-link to="/contact" class="text-plain">
                  <p class="tool-icon">
                    <i class="el-icon-edit-outline contact"></i>
                  </p>
                  <p class="tool-text">
                    联系我们
                  </p>
                </router-link>
              </el-col>
            </el-row>
            <el-row class="mt-1">
              <el-col :span="6" class="text-center">
                <router-link to="/shop" class="text-plain">
                  <p class="tool-icon">
                    <i class="el-icon-s-shop order"></i>
                  </p>
                  <p class="tool-text">
                    积分商城
                  </p>
                </router-link>
              </el-col>
              <el-col :span="6" class="text-center">
                <router-link to="/shou" class="text-plain">
                  <p class="tool-icon">
                    <i class="el-icon-star-off info"></i>
                  </p>
                  <p class="tool-text">
                    我的收藏
                  </p>
                </router-link>
              </el-col>
            </el-row>
          </div>
        </el-card>
        <div class="btn-logout">
          <el-button type="danger" class="btn-block" @click="dialogVisible = true">
            <i class="el-icon-switch-button"></i> 退出登录
          </el-button>
        </div>
      </el-main>
      <el-footer class="footer">
        <footbar></footbar>
      </el-footer>
    </el-container>

    <el-dialog title="退出" :visible.sync="dialogVisible" width="95%">
      <span>你确定要退出登录吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">取消</el-button>
        <el-button @click="logoutBtn">确定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import footbar from "@/components/footbar.vue";
  export default {
    data() {
      return {
        dialogVisible: false,
        userdata: {
        }
      }
    },
    components: {
      footbar,
    },
    methods: {
      logoutBtn() {
        this.dialogVisible = false;
        this.$router.push("/login");
        this.axios.get("http://localhost:8090/user/logout")
        .then(res => {
          // console.log("成功" + res);
        })
        .catch(res => {
          console.log("失败" + res);
        });
      },
    },
    mounted() {
      this.axios.get("http://localhost:8090/user/userDetail")
      .then(res => {
        this.userdata = res.data.data;
        // console.log(this.userdata);
      })
      .catch(res => {
        console.log("失败" + res);
      });
    }
  }
</script>

<style scoped="scoped">
  .mine-bg {
    background: url(../assets/img/mine.jpg);
  background-size: cover;
  height: 87vh;
  padding: 20px 20px 40px 20px;
  border: 0px solid transparent;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  }

  .text {
    font-size: 14px;
  }

  .item {
    /* padding: 18px 0; */
  }

  .mine-card {
    margin: -40rem 12rem 1rem 12rem;
    background-color: rgba(255,255,255,0.9);
  }

  .avatar {
    width: 5rem;
  }

  .username {
    font-size: 1.2rem;
    margin-bottom: 4px;
    margin-left: 1rem;
    color: #303133;
  }

  .userid {
    margin-left: 1rem;
    margin-top: 0;
    color: #909399;
  }

  .man {
    color: #409EFF;
    margin-left: 0.5rem;
  }

  .woman {
    color: #ff557f;
    margin-left: 0.5rem;
  }


  .mine-card-tool {
    margin: 1rem 5rem 1rem 5rem;
    background-color: rgba(255,255,255,0.9);
  }

  .tool-icon {
    font-size: 2rem;
    margin: 0.5rem 0;
  }

  .tool-text {
    margin-top: 0.5rem;
  }

  .order {
    color: #53A8FF;
  }

  .contact {
    color: #F56C6C;
  }

  .info {
    color: rgb(247, 160, 30);
  }

  .password {

    color: #67C23A;
  }
</style>
