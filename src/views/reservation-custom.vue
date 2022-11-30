<template>
  <div>
    <el-container class="wrapper">
      <el-main class="section text-left">
        <div class="res-bg"></div>
        <el-card class="box-card res-form">
          <div slot="header" class="clearfix">
            <span>预订客房</span>
          </div>
          <div class="text item">
            <!-- <el-form
              :model="resinfo"
              :rules="rules"
              ref="ruleForm"
              label-width="80px"
              class="demo-ruleForm"
            > -->
            <el-form label-width="80px" >
              <el-form-item label="客房类型">
                <!-- <el-select v-model="resinfo.type" placeholder="请选择" :disabled="lockCondition">
									<el-option v-for="item in roomtype" :key="item.id" :label="item.typeName" :value="item.id">
									</el-option>
								</el-select> -->
                <el-form-item
                  :label="$store.state.order.roomType"
                ></el-form-item>
              </el-form-item>

              <el-form-item label="入住日期" @click="resolveData">
                <!-- <el-select v-model="resinfo.type" placeholder="请选择" :disabled="lockCondition">
									<el-option v-for="item in roomtype" :key="item.id" :label="item.typeName" :value="item.id">
									</el-option>
								</el-select> -->
                <el-form-item
                  :label="$store.state.order.start"
                  label-width="auto"
                ></el-form-item>
              </el-form-item>

              <el-form-item label="离店日期"  @click="resolveData">
                <!-- <el-select v-model="resinfo.type" placeholder="请选择" :disabled="lockCondition">
									<el-option v-for="item in roomtype" :key="item.id" :label="item.typeName" :value="item.id">
									</el-option>
								</el-select> -->
                <el-form-item
                  :label="$store.state.order.end"
                  label-width="auto"
                ></el-form-item>
              </el-form-item>

              <el-form-item>
                <el-button
                  :type="searchBtnType"
                  @click="checkroom()"
                  :disabled="checkBtnDis"
                >
                  <i :class="searchicon"></i>
                  查询可用房间
                </el-button>
                <dialog-component v-if="Visible" ref="dialog"></dialog-component>
              </el-form-item>

              <!-- 提供一个房间号码对房间id的映射，即用户选择的是房间号，但存的是房间id -->
              <el-form-item label="房间号码" >
                <el-select v-model="roomnumber">
                  <el-option v-for="item in roomnumbers" :value="item">
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="价格">
                <!-- <span v-model="resinfo.type" class="room-price">{{sumprice}} 元</span> -->
                <el-form-item
                  :label="$store.state.order.priceTotal"
                ></el-form-item>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  @click="toPay()"
                
                  >立即预订</el-button
                >
                <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
              </el-form-item>
            </el-form>
          </div>
        </el-card>
        <!--        <el-button type="success" @click="oktest">预订成功测试</el-button>
        <el-button type="danger" @click="failtest">预订失败测试</el-button> -->
      </el-main>
      <el-footer class="footer">
        <footbar></footbar>
      </el-footer>

      <!-- <el-dialog title="提示" :visible.sync="dialogVisible" width="95%">
        <span>你确定要提交预订单吗？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmSubmitForm">确定</el-button>
        </span>
      </el-dialog> -->
    </el-container>
  </div>
</template>

<script>
import footbar from "@/components/footbar.vue";
import store from "./../store";
import dialogComponent from "@/views/dialogComponent.vue";
export default {
  data() {
    return {
      Visible:false,
      pingmian: require("@/assets/img/pingmian_final.jpg"),
      resinfo: {
        id: "",
        type: "",
        indate: "",
        leavedate: "",
        num: "",
        isNeedInvoice: false,
      },
      price: 0,
      sumprice: 0,
      maxp: 1,
      lockCondition: false,
      isNotSelect: true,
      checkBtnDis: false,
      searchicon: "el-icon-search",
      searchBtnType: "primary",
      dialogVisible: false,

      roomnumbers: ["1", "2"],
      roomnumber: "",

      roomtype: [],
      rules: {
        type: [
          {
            required: true,
            message: "请选择房间类型",
            trigger: "change",
          },
        ],
        id: [
          {
            required: true,
            message: "请选择房间号",
            trigger: "change",
          },
        ],
        indate: [
          {
            type: "date",
            required: true,
            message: "请选择入住时间",
            trigger: "change",
          },
        ],
        leavedate: [
          {
            type: "date",
            required: true,
            message: "请选择离店时间",
            trigger: "change",
          },
        ],
      },
    };
  },
  components: {
    footbar,
    dialogComponent,
  },
  methods: {
    toPay(){
      if (this.roomnumber.length == 0){
        alert("please choose a roomnumber")
      }else{
        this.$store.state.order.roomNumber = this.roomnumber;
      }
      this.axios
        .post("http://localhost:9091/customer/addOrder", {
          hotel_name:this.$store.state.order.hotelName,
          start:this.$store.state.order.start,
          end:this.$store.state.order.end,
          room_number:this.$store.state.order.roomNumber,
          phone_number:this.$store.state.order.phone_number,
          price:this.$store.state.order.priceTotal,
        })
        .then((res) => {
          alert("submit ok")
          this.$router.push("/submitok");
        })
        .catch((res) => {
          alert("submit fail")
          this.$router.push("/submitfail");
        });
    },

    submitForm(formName) {
      this.dialogVisible = true;
    },
    resetForm(formName) {
      this.checkBtnDis = false;
      this.searchicon = "el-icon-search";
      this.searchBtnType = "primary";
      this.isNotSelect = true;
      this.price = 0;
      this.sumprice = 0;
      this.resinfo.isNeedInvoice = false;
      this.$refs[formName].resetFields();
    },
    oktest() {
      this.$router.push("/submitok");
    },
    failtest() {
      this.$router.push("/submitfail");
    },
    confirmSubmitForm() {
      this.dialogVisible = false;
      let json = {
        roomId: parseInt(this.resinfo.id),
        inTime: this.changeTimeStr(this.resinfo.indate),
        leaveTime: this.changeTimeStr(this.resinfo.leavedate),
        realPeople: this.resinfo.num,
        fapiao: this.fapiao,
      };
      console.log(json);
      this.axios
        .post("http://localhost:8090/user/bookRoom", json)
        .then((res) => {
          this.$router.push("/submitok");
        })
        .catch((res) => {
          this.$router.push("/submitfail");
        });
    },

    checkroom() {
      this.Visible=true;
      this.$nextTick(()=>{
        this.$refs.dialog.init();
      })
    },
    changeTimeStr(str) {
      str = str.toString();
      str = str.replace(/ GMT.+$/, ""); // Or str = str.substring(0, 24)
      let d = new Date(str);
      let a = [
        d.getFullYear(),
        d.getMonth() + 1,
        d.getDate(),
        d.getHours(),
        d.getMinutes(),
        d.getSeconds(),
      ];
      for (var i = 0, len = a.length; i < len; i++) {
        if (a[i] < 10) {
          a[i] = "0" + a[i];
        }
      }
      str = a[0] + "-" + a[1] + "-" + a[2] + " " + a[3] + ":" + a[4];
      return str;
    },
    calcPrice() {
      let realday =
        Math.abs(this.resinfo.leavedate - this.resinfo.indate) / 86400000;
      console.log(Math.ceil(realday));
      realday = Math.ceil(realday);
      let price = this.price;
      this.sumprice = price * realday;
      console.log(this.sumprice, price, realday);
    },
  },
  mounted() {
    //获取 roomnumber
    this.axios
      .post("http://localhost:9091/customer/select1", {
        hotel_name: this.$store.state.order.hotelName,
        room_type: this.$store.state.order.roomType,
        start: this.$store.state.order.start,
        end: this.$store.state.order.end,
      })
      .then((res) => {
        this.roomnumbers = res.data;
        console.log(this.roomnumbers);
      })
      .catch(() => {
        console.log("error");
      });
  },
  computed: {
    fapiao() {
      if (this.resinfo.isNeedInvoice == true) return 1;
      else return 0;
    },
  },
};
</script>

<style scoped="scoped">
.res-bg {
  background: url(../assets/img/reservation-c.jpg);
  background-size: cover;
  height: 95vh;
  border: 0px solid transparent;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.text {
  font-size: 14px;
}

.item {
  padding: 9px 0;
}

.res-form {
  margin: -50rem 1rem 1rem 1rem;
  background-color: rgba(255, 255, 255, 0.8);
}

/* .el-card__body {
    padding: 20px 20px 20px 0px;
  } */

.el-select {
  width: 100%;
}

.room-price {
  font-size: 1.3rem;
  color: #f56c6c;
}
.image {
  height: 17rem;
  display: block;
  padding: 5rem;
  border: 1px solid transparent;
  border-radius: 20px;
  margin: auto;
}
.imagee {
  height: 18rem;
  display: block;
  padding: 5rem;
  border: 1px solid transparent;
  border-radius: 20px;
  margin: auto;
}
.ml-4 {
  margin-left: 5rem;
}
.mr-4 {
  margin-right: 5rem;
}
</style>
