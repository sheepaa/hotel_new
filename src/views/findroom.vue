<template>
  <div>
    <el-container class="wrapper">
      <!-- <el-header class="header">找房</el-header> -->
      <el-main class="section">
        <div class="bg-header"></div>
        <el-card class="box-card pb-1">
          <div class="text item">
            <el-row>
              <el-col :span="16">
                <p class="text-left fang">
                  <i class="el-icon-location-outline"></i>
                  {{ $store.state.hotelName }}
                </p>
              </el-col>
              <!-- 回到findhotel -->
              <el-col :span="8">
                <p class="text-right">
                  <i class="el-icon-arrow-right"></i>
                </p>
              </el-col>
            </el-row>

            <el-form ref="form" :model="form">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="入住时间">
                    <el-date-picker
                      type="date"
                      placeholder="选择日期"
                      v-model="form.comedate"
                      style="width: 100%"
                      value-format="yyyy-MM-dd"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="离店时间">
                    <el-date-picker
                      type="date"
                      placeholder="选择日期"
                      v-model="form.leavedate"
                      style="width: 100%"
                      value-format="yyyy-MM-dd"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-form-item>
                <el-button
                  type="primary"
                  icon="el-icon-search"
                  class="btn-block fang"
                  @click="searchBtn"
                  >查找空余房间
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>

        <el-row class="mt-1">
          <!-- TODO: 调整显示格式 -->
          <el-col
            :span="22"
            v-for="(room, index) in listdata"
            :key="index"
            :offset="1"
            class="mb-1"
          >
            <el-card :body-style="{ padding: '0px' }" class="transparent">
              <el-row>
                <el-col :span="8">
                  <img :src="room.coverImage" class="image" />
                </el-col>
                <el-col :span="8">
                  <div style="padding: 14px" class="text-left room">
                    <p class="room-title fang">
                      {{ room.room_type }}
                    </p>

                    <p class="room-price mt-1" v-if="(room.price_final === room.price_initial)">￥{{ room.price_initial }}</p>

                    <p v-else>
                      <span style="color: firebrick; font-size: 25px" class="mt-1"
                        >￥{{room.price_final}}</span
                      >
                      <span class="mt-1"
                        style="text-decoration: line-through; font-size: 12px"
                        >¥{{ room.price_initial }}</span
                      >
                    </p>
                  </div>
                </el-col>
                <el-col :span="8" style="margin-bottom: 5px">
                  <el-row align="center">
                    <el-button class="fang mt-1"
                      type="primary"
                      plain
                      @click="clickDisplayInfo(room)"
                      >查看详情</el-button
                    >
                  </el-row>
                  <el-row>
                    <el-button  class="fang mt-1 mb-1" type="primary" plain @click="toOrder(room)"
                      >订房</el-button
                    >
                  </el-row>

                  <!-- <el-button type="primary" plain>主要按钮</el-button> -->
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
      <el-footer class="footer">
        <footbar ref="footbar"></footbar>
      </el-footer>
      <el-dialog title="提示" :visible.sync="dialogVisible" width="95%">
        <span>您还没有选择完整的时间段！</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false"
            >确定</el-button
          >
        </span>
      </el-dialog>

      <el-dialog
        title="房间详情"
        :visible.sync="dialogVisibleInfo"
        width="30%"
        :before-close="handleClose"
      >
        <!-- <el-row type="flex">
          <el-col :span="12">Square:{{ displayInfo.Square }}</el-col>
          <el-col :span="12">Floor:{{ displayInfo.Floor }}</el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="8">WIFI:{{ displayInfo.WIFI }}</el-col>
          <el-col :span="8">Window:{{ displayInfo.Window }}</el-col>
          <el-col :span="8">Smoking:{{ displayInfo.Smoking }}</el-col>
        </el-row> -->
        <el-row v-for="(item, index) in displayInfo">
          {{ item }}
        </el-row>

        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisibleInfo = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </el-container>
  </div>
</template>

<script>
import footbar from "@/components/footbar.vue";
import { clearScreenDown } from "readline";
import store from "./../store";

export default {
  data() {
    return {
      // hotel_name = this.$route.query.
      dialogVisible: false,
      dialogVisibleInfo: false, //查看详情

      displayInfo: {
        Square: "",
        Floor: "",
        WIFI: "",
        Window: "",
        Smoking: "",
      },
      form: {
        comedate: "",
        leavedate: "",
        currentDate: new Date(),
      },
      listdata: [
        {
          room_type: "大床房",
          // intro: "good",
          price: 1000,
          intro: {
            Square: "1",
            Floor: "2",
            WIFI: "3",
            Window: "4",
            Smoking: "5",
          },
        },
        {
          room_type: "双床房",
          // intro: "good",
          price: 100,
          intro: {
            Square: "2",
            Floor: "3",
            WIFI: "4",
            Window: "5",
            Smoking: "6",
          },
        },
      ],
    };
  },
  components: {
    footbar,
  },

  methods: {
    clickDisplayInfo(room) {
      console.log(room);
      console.log(room.intro);

      this.dialogVisibleInfo = true;
      // console.log("we")
      this.displayInfo = room.intro;
    },
    // showroom() {
    //   console.log(123);
    //   this.roomVisible = true;
    // },

    searchBtn() {
      alert("fdsfdsfd"),
        // this.$axios.post("http://localhost:9091/customer/aaa",params),
        this.$ajax.post("", { te: "uuuu" }).then();

      alert("yyyyy");
    },

    // searchBtn(param) {
    //   alert("dd")

    //   this.$axios.post("/customer/aaa",param)
    //   alert("ee")

    //   // console.log(this.changeTimeStr(this.form.comedate));
    //   // if (this.form.comedate == "" || this.form.leavedate == "") {
    //   //   this.dialogVisible = true;
    //   //   return;
    //   // }
    //   // console.log("into")
    //   // console.log(this.form.comedate)
    //   // console.log(this.form.leavedate)
    //   // console.log("aba")
    //   // this.$store.commit("setDate", [this.form.comedate, this.form.leavedate]);

    //   // this.$axios
    //   //   .post("http://localhost:9091/customer/select4", {
    //   //     hotel_name: this.$store.state.hotelName,
    //   //     // start: this.changeTimeStr(this.form.comedate),
    //   //     // end: this.changeTimeStr(this.form.leavedate),
    //   //     start: this.form.comedate,
    //   //     end: this.form.leavedate,
    //   //   })

    //   //   .then((res) => {
    //   //     this.listdata = res.data;
    //   //   })
    //   //   .catch(() => {
    //   //     console.log("error");
    //   //   });
    // },

    getDate: function () {
      var _this = this;
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth() + 1;
      let dd = new Date().getDate();
      if (String(mm).length == 1) {
        mm = "0" + String(mm);
      }
      if (String(dd).length == 1) {
        dd = "0" + String(dd);
      }
      this.form.comedate = yy + "-" + mm + "-" + dd;
      let tomorrow = new Date(new Date().getTime() + 86400000);
      let yyt = tomorrow.getFullYear();
      let mmt = tomorrow.getMonth() + 1;
      let ddt = tomorrow.getDate();
      if (String(mmt).length == 1) {
        mmt = "0" + String(mmt);
      }

      if (String(ddt).length == 1) {
        ddt = "0" + String(ddt);
      }
      this.form.leavedate = yyt + "-" + mmt + "-" + ddt;
    },
    // 保存信息并且跳转到订房
    toOrder(room) {
      console.log("in");
      let hotel_name = this.$store.state.hotelName;
      let room_type = room.room_type;
      let start = this.form.comedate;
      let end = this.form.leavedate;
      let price = room.price_final;
      this.$store.dispatch("SetOrder", [
        hotel_name,
        room_type,
        start,
        end,
        price,
      ]);
      console.log(this.$store.state.order.roomType);
      this.$router.push("/reservation-c");
      this.$refs.footbar.reservationBtn();
    },
  },

  mounted() {
    this.getDate();

    this.$store.commit("setDate", [this.form.comedate, this.form.leavedate]);
    this.$axios
      .post("http://localhost:9091/customer/select4", {
        hotel_name: this.$store.state.hotelName,
        start: this.form.comedate,
        end: this.form.leavedate,
      })
      .then(
        (res) => {
          this.listdata = res.data;
          console.log(res.data);
          console.log(this.listdata);
        },
        (error) => {
          console.log("fail", error);
        }
      )
      .catch((res) => {
        console.log(res);
      });
  },
};
</script>

<style scoped="scoped">
.box-card {
  height: 30vh;
  margin: -40rem 1rem 0;
  background: rgba(255, 255, 255, 0.85);
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

/* .image {
  width: 80%;
  display: block;
  padding: 1rem;
  border: 1px solid transparent;
  border-radius: 20px;
} */

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.room p {
  margin-bottom: 0.25rem;
  margin-top: 0;
}

.room-title {
  font-size: 1.2rem;
  font-weight: bolder;
  color: #303133;
}

.room-intro {
  font-size: 0.9rem;
  color: #606266;
}

.room-price {
  font-size: 1.2rem;
  color: #f56c6c;
}

.room-comment {
  font-size: 0.8rem;
  color: #909399;
}

.black {
  color: #303133;
}

.transparent {
  background: rgba(255, 255, 255, 0.8);
}
</style>
