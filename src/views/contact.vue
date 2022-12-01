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
        contact: {
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
    },
    methods: {
      back() {
        this.$router.push("/mine");
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
  
</style>
