<template>
  <el-dialog title="房间平面分布" :visible.sync="detailVisible" width="90%">
    <el-card class="box-card ml-4 mr-4 mb-1 mt-1 transparament">
      <el-button type="warning" disabled class="double1">双1</el-button>
      <!-- <el-button type="warning">双2</el-button>
      <el-button type="warning">双3</el-button>
      <el-button type="warning">双4</el-button>
      <el-button type="warning">双5</el-button>
      <el-button type="warning">双6</el-button> -->
      <img :src="pingmiantest" @click="a" alt="" class="imagee" />
      <el-button type="warning">大1</el-button>
      <el-button type="warning">大2</el-button>
      <el-button type="warning">大3</el-button>
      <el-button type="warning">大4</el-button>
      <el-button type="warning">大5</el-button>
      <el-button type="warning">大6</el-button>
      <el-button type="warning">单1</el-button>
      <el-button type="warning">单2</el-button>
      <el-button type="warning">单3</el-button>
      <el-button type="success" @click="close">确认</el-button>
      <el-button type="danger" @click="close">取消</el-button>
    </el-card>
  </el-dialog>
</template>
<script>
export default {
  name: "dialogComponent",
  data() {
    return {
      detailVisible: false,
      pingmiantest: require("@/assets/img/pingmian_final.jpg"),
    };
  },
  methods: {
    init() {
      this.detailVisible = true;
      console.log("123");
    },
    close() {
      this.detailVisible = false;
    },
    a(e) {
      this.pageX = e.x;
      this.pageY = e.y; //鼠标点击位置
      this.clientWidth = document.body.clientWidth / 29.698;
      this.clientHeight = 560;
      console.log(this.pageX)
      console.log(this.pageY)
      console.log(document.body.clientWidth)
      console.log(document.body.clientHeight)
      if (
        this.pageX >= 10.4 * this.clientWidth &&
        this.pageX < 11.4 * this.clientWidth &&
        this.pageY < this.clientHeight
      ) {
        console.log("双床1");
      } else if (
        this.pageX >= 11.4 * this.clientWidth &&
        this.pageX < 12.4 * this.clientWidth &&
        this.pageY < this.clientHeight
      ) {
        console.log("双床2");
      } else if (
        this.pageX >= 12.4 * this.clientWidth &&
        this.pageX < 13.4 * this.clientWidth &&
        this.pageY < this.clientHeight
      ) {
        console.log("双床3");
      } else if (
        this.pageX >= 13.4 * this.clientWidth &&
        this.pageX < 14.4 * this.clientWidth &&
        this.pageY < this.clientHeight
      ) {
        console.log("双床4");
      } else if (
        this.pageX >= 14.4 * this.clientWidth &&
        this.pageX < 15.4 * this.clientWidth &&
        this.pageY < this.clientHeight
      ) {
        console.log("双床5");
      } else if (
        this.pageX >= 15.4 * this.clientWidth &&
        this.pageX < 16.4 * this.clientWidth &&
        this.pageY < this.clientHeight
      ) {
        console.log("双床6");
      } else if (
        this.pageX >= 10.4 * this.clientWidth &&
        this.pageX < 11.4 * this.clientWidth &&
        this.pageY < this.clientHeight
      ) {
        console.log("大床1");
      } else if (
        this.pageX >= 11.4 * this.clientWidth &&
        this.pageX < 12.4 * this.clientWidth &&
        this.pageY > this.clientHeight
      ) {
        console.log("大床2");
      } else if (
        this.pageX >= 12.4 * this.clientWidth &&
        this.pageX < 13.4 * this.clientWidth &&
        this.pageY > this.clientHeight
      ) {
        console.log("大床3");
      } else if (
        this.pageX >= 13.4 * this.clientWidth &&
        this.pageX < 14.4 * this.clientWidth &&
        this.pageY > this.clientHeight
      ) {
        console.log("大床4");
      } else if (
        this.pageX >= 14.4 * this.clientWidth &&
        this.pageX < 15.4 * this.clientWidth &&
        this.pageY > this.clientHeight
      ) {
        console.log("大床5");
      } else if (
        this.pageX >= 15.4 * this.clientWidth &&
        this.pageX < 16.4 * this.clientWidth &&
        this.pageY > this.clientHeight
      ) {
        console.log("大床6");
      } else {
        console.log("aba");
      }
    },
  },
};
</script>
<style>
.imagee {
  height: 18rem;
  display: block;
  padding: 0rem;
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

.center {
  position: relative;
  top: 50%; /*偏移*/
  transform: translateY(50%);
  text-align: center;
}

.double1 {
  position: relative;
  right: 100px;
}
</style>
