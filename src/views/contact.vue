<template>
  <div>
    <el-container class="wrapper">
      <el-main class="section text-center">
        <el-card class="box-card contact-card">
          <div class="text item">
            <p class="contact-title">联系我们</p>
            <div class="contact-info text-centre">
              <p class="contact-eng">Very goooooooood Hotel, Inc</p>
              <p>广东省深圳市南山区学苑大道1088号</p>
              <p>南方科技大学OOAD开发小组</p>
              <p>Tel:189-6480-7259</p>
              <p><E-mail>2302236513@qwer.com</E-mail></p>
            </div>
            <div class="mt text-centre">
              <p class="contact-title">或者</p>
              <el-button @click="open()" :disabled="false" type="text">点击此处在线联系人工客服</el-button>
            </div>
            <el-dialog title="客服" :visible.sync="dialogVisible" width="60%">
              <iframe :src='src' frameborder='0' style="width:40%;height:80%"></iframe>
              <span slot="footer" class="dialog-footer">
                <el-button type="danger" @click="changeVisible = false" class="center">返回</el-button>
              </span>
            </el-dialog>
            <el-button @click="back" type="danger" class="mt">返回</el-button>
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
        contact: {
          showSessionId:'',
          src:'',
          comment: '',
          eva: null,
        },
        iconstyle: 'el-icon-document-checked',
        disabled: false,
        btnType: 'primary',
        isRealcontact: false,
        colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
        btnText: '提交反馈'
      }
    },
    components: {
      footbar,
    },
    mounted() {
      this.$store.commit("setMine");
      this.showSessionId = window.location.search;
      // this.src = `./public/websocket.html${this.showSessionId}`;
    },
    methods: {
      back() {
        this.$router.push("/mine");
      },
      open() {
        window.open("http://localhost:9091/websocket/helper")
      }
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

  .contact-card {
    margin: 2rem 1rem 1rem 1rem;
  }

  .contact-title {
    font-size: 2rem;
    font-weight: lighter;
    margin-top: 1rem;
  }

  .wrapper {
    min-height: 94vh;
  }

  #app {
    overflow: hidden;
  }

  .contact-eng {
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 0;
  }
  
  .contact-info p {
    margin: 0.4rem 0;
  }
  
  .mt {
    margin-top: 5rem;
  }
</style>
