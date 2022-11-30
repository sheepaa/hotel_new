<template>
  <el-card class="box-card">
    <div class="item text-center">
      <el-row>
        <el-col :span="24">
          <img src="../assets/img/fail.png" class="img-status" />
        </el-col>
        <el-col :span="24">
          <div class="text text-centre">
            <p>由于网络故障，您的订单没有成功提交。</p>
            <p>请稍后重新提交</p>
          </div>
          <!-- <el-button type="warning" @click="contact">意见反馈</el-button> -->
          <el-button @click="back">返回主页</el-button>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
 import footbar from "@/components/footbar.vue";
 import store from './../store';
 export default {
   data() {
     return {
       
     }
   },
   components: {
     footbar,
   },
   methods: {
     back() {
       this.$store.commit('setFind');
       this.$router.push("/findroom");
     },
     contact() {
       this.$store.commit('setMine');
       this.$router.push("/contact");
     }
   }
 }
</script>

<style>
  .text {
    font-size: 1rem;
  }

  .item {
    /* padding: 18px 0; */
  }
  
  .box-card {
    margin: 18rem;
  }
</style>
