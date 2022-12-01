<template>
  <div class="pop-footer">
    <div>
      <el-row>
        <el-col :span="6">
          <router-link to="/findhotel">
            <div :class="findhCls" v-on:click="findhBtn"><i class="el-icon-location"></i> 找酒店</div>
          </router-link>
        </el-col>
        <el-col :span="6">
          <router-link to="/findroom">
            <div :class="findCls" v-on:click="findBtn"><i class="el-icon-s-home"></i> 找房</div>
          </router-link>
        </el-col>
        <el-col :span="6">
          <router-link to="/reservation-c">
            <div :class="reservationCls" v-on:click="reservationBtn"><i class="el-icon-s-order"></i> 订房</div>
          </router-link>
        </el-col>
        <el-col :span="6">
          <router-link to="/mine">
            <div :class="mineCls" v-on:click="mineBtn"><i class="el-icon-user-solid"></i> 我的</div>
          </router-link>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import 'element-ui/lib/theme-chalk/index.css';
  import store from './../store';
  export default {
    data() {
      return {
        findhCls: "",
        findCls: "",
        reservationCls: "",
        mineCls: "",
      }
    },
    methods: {
      findhBtn() {
        this.$store.commit('setFindh');
        this.changeColor();
      },
      findBtn() {
        console.log("find")
        this.$store.commit('setFind');
        this.changeColor();
      },
      reservationBtn() {
        this.$store.commit('setRes');
        this.changeColor();
      },
      mineBtn() {
        this.$store.commit('setMine');
        this.changeColor();
      },
      initColor() {
        this.findhCls = "grid-content text-white";
        this.findCls = "grid-content text-white";
        this.reservationCls = "grid-content text-white";
        this.mineCls = "grid-content text-white";
      },
      changeColor() {
        switch (this.$store.state.position) {
          case "findhotel" :
            this.findhCls += " footer-active";
            break;
          case "findroom":
            this.findCls += " footer-active";
            break;
          case "resveration":
            this.reservationCls += " footer-active";
            break;
          case "mine":
            this.mineCls += " footer-active";
            break;
        }
      }
    },
    created() {
      this.initColor();
      this.changeColor();
    },
  }
</script>

<style scoped="scoped">
  .el-row {
    background-color: rgb(98, 60, 116);
    min-height: 6vh;
    line-height: 6vh;
    color: #fff;
    font-size: 1rem;
  }

  .footer-active {
    background: rgb(183, 97, 204);
  }

  .text-white {
    color: #fff;
    text-decoration: none;
  }

  a:hover {
    text-decoration: none;
    color: #fff;
  }

  .font {
  font-family: bobo;
  }
</style>
