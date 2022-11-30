<template>
    <div>
      <el-container class="wrapper">
        <el-main class="section">
          <el-card class="box-card changeinfo-card">
            <div class="text item">
              <p class="changeinfo-title">积分商城</p>
              <el-button @click="back">返回</el-button>
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

        }
      },
      components: {
        footbar,
      },
      mounted(){
      },
      methods: {
      },
      computed: {

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
    
    .changeinfo-card {
      margin: 2rem 5rem 1rem 5rem;
    }
    
    .changeinfo-title {
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
    
    
  </style>
  