<template>
  <div>
    <el-container class="wrapper fang">
      <el-main class="section">
        <el-card class="box-card changeinfo-card">
          <div class="text item">
            <p class="changeinfo-title">积分商城</p>

            <el-row class="mt-1">
              <el-col :span="24" class="text-centre">
                <p class="subtitle">您现在的积分为：{{ credits }}</p>
              </el-col>
            </el-row>

            <el-row class="mt-1" v-for="(good, index) in goods">
              <el-col :span="6" class="text-right">
                <img :src="good.src" class="avatar" />
              </el-col>
              <el-col :span="18">
                <p class="userid text-left">{{ good.info }}</p>
                <p class="b text-left">所需积分:{{ good.credit }}</p>
                <el-button type="primary" @click="confirm(good)" class="fang"
                  ><i class="el-icon-discount"></i> 兑换</el-button
                >
              </el-col>
              <!-- <el-dialog
                title="兑换确认"
                :visible.sync="dialogVisible"
                width="30%"
              > -->
              <!-- <span>你确定要兑换该件商品吗？</span>
                <span slot="footer" class="dialog-footer">
                  <el-button
                    type="danger"
                    @click="dialogVisible = false"
                    class="center"
                    >取消</el-button
                  >
                  <el-button type="primary" @click="confirm(good)" class="center"
                    >确定</el-button
                  >
                </span> -->
              <!-- </el-dialog> -->
            </el-row>

            <!-- <el-row class="mt-5">
              <el-col :span="6" class="text-right">
                <img src="../assets/img/breakfast.jpg" class="avatar" />
              </el-col>
              <el-col :span="18">
                <p class="userid text-left">早餐券</p>
                <p class="b text-left">所需积分:750</p>
                <el-button type="primary" @click="dialogVisible = true"><i class="el-icon-discount"></i> 兑换</el-button>
              </el-col>
            </el-row>

            <el-row class="mt-5">
              <el-col :span="6" class="text-right">
                <img src="../assets/img/hotelmodel.jpg" class="avatar" />
              </el-col>
              <el-col :span="18">
                <p class="userid text-left">酒店纪念模型</p>
                <p class="b text-left">所需积分:5000</p>
                <el-button type="primary" @click="dialogVisible = true"><i class="el-icon-discount"></i> 兑换</el-button>
              </el-col>
            </el-row> -->

            <el-button @click="back" type="danger" class="mt-5 fang">返回</el-button>
          </div>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import footbar from "@/components/footbar.vue";
import store from "./../store";
export default {
  data() {
    return {
      dialogVisible: false,
      credits: 100,
      goods: [
        {
          info: "200元 西餐抵用券",
          credit: 1500,
          // src:"../assets/img/200.jpg",
          src: require("@/assets/img/200.jpg"),
        },
        {
          info: "早餐券",
          credit: 750,
          // src:"../assets/img/breakfast.jpg",
          src: require("@/assets/img/breakfast.jpg"),
        },
        {
          info: "酒店纪念模型",
          credit: 5000,
          // src:"../assets/img/hotelmodel.jpg",
          src: require("@/assets/img/hotelmodel.jpg"),
        },
      ],
    };
  },
  components: {
    footbar,
  },
  mounted() {},
  methods: {
    confirm(good) {
      this.axios
        .post("http://localhost:9091/customer/minusCount", {
          credit: String(good.credit),
          gift: good.info,
        })
        .then((res) => {
          if (res.data == true) {
            alert("兑换成功！");
          } else {
            alert("积分不足");
          }
        })
        .catch((err) => {
          alert("error");
        });
      this.axios
        .get("http://localhost:9091/customer/selectCount")
        .then((result) => {
          console.log(result.data)
          this.credits = result.data;
        })
        .catch((err) => {
          // alert("error");
        });
    },
    back() {
      this.$router.push("/mine");
    },
    a() {
      alert("你确定要兑换该件礼品吗？");
    },
  },
  mounted() {
    this.axios
      .get("http://localhost:9091/customer/selectCount")
      .then((result) => {
        this.credits = result.data;
      })
      .catch((err) => {
        // alert("error");
      });
  },
  computed: {},
};
</script>

<style scoped="scoped">
.avatar {
  width: 8rem;
}
.userid {
  margin-left: 1rem;
  margin-top: 0;
  color: #b882ff;
}

.b {
  margin-left: 1rem;
  margin-bottom: 0;
}
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

.subtitle {
  font-size: 1rem;
  font-weight: lighter;
  margin-top: 1rem;
}

.wrapper {
  min-height: 94vh;
}

.el-main {
  max-height: 94vh;
}

.mt-5 {
  margin-bottom: 0.5rem;
}
#app {
  overflow: hidden;
}

.center {
  position: relative;
  left: -140px;
}
</style>
