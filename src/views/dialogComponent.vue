<template>
  <el-dialog title="房间平面分布" :visible.sync="detailVisible" width="90%">
    <el-card class="box-card ml-4 mr-4 mb-1 mt-1 transparament">
      <el-button type="warning" :disabled="disables[101]" class="double1 down" @click="chooseRoom('101')"
        >双1</el-button
      >
      <el-button type="warning" :disabled="disables[102]" class="double1 down" @click="chooseRoom('102')"
        >双2</el-button
      >
      <el-button type="warning" :disabled="disables[103]" class="double2 down" @click="chooseRoom('103')"
        >双3</el-button
      >
      <el-button type="warning" :disabled="disables[104]" class="double2 down" @click="chooseRoom('104')"
        >双4</el-button
      >
      <el-button type="warning" :disabled="disables[105]" class="double3 down" @click="chooseRoom('105')"
        >双5</el-button
      >
      <el-button type="warning" :disabled="disables[106]" class="double3 down" @click="chooseRoom('106')"
        >双6</el-button
      >
      <img :src="pingmiantest" @click="a" alt="" class="imagee" />
      <el-row>
        <el-button type="warning" :disabled="disables[115]" class="double1 up" @click="chooseRoom('115')"
          >大1</el-button
        >
        <el-button type="warning" :disabled="disables[114]" class="double1 up" @click="chooseRoom('114')"
          >大2</el-button
        >
        <el-button type="warning" :disabled="disables[113]" class="double2 up" @click="chooseRoom('113')"
          >大3</el-button
        >
        <el-button type="warning" :disabled="disables[112]" class="double2 up" @click="chooseRoom('112')"
          >大4</el-button
        >
        <el-button type="warning" :disabled="disables[111]" class="double3 up" @click="chooseRoom('111')"
          >大5</el-button
        >
        <el-button type="warning" :disabled="disables[110]" class="double3 up" @click="chooseRoom('110')"
          >大6</el-button
        >
        <el-button type="warning" :disabled="disables[109]" class="double4 up" @click="chooseRoom('109')"
          >单1</el-button
        >
        <el-button type="warning" :disabled="disables[108]" class="double5 up" @click="chooseRoom('108')"
          >单2</el-button
        >
        <el-button type="warning" :disabled="disables[107]" class="double5 up" @click="chooseRoom('107')"
          >单3</el-button
        >
      </el-row>
      <el-row>
        <el-button type="success" @click="close" class="confirm"
          >确认</el-button
        >
        <el-button type="danger" @click="close" class="confirm">取消</el-button>
      </el-row>
    </el-card>
  </el-dialog>
</template>
<script>
export default {
  name: "dialogComponent",

  props: {
    roomnumbers: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },

  data() {
    return {
      // props:["roomnumbers"],
      detailVisible: false,
      pingmiantest: require("@/assets/img/pingmian_final.jpg"),
      test: false,
      disables: {
        101: true,
        102: true,
        103: true,
        104: true,
        105: true,
        106: true,
        107: true,
        108: true,
        109: true,
        110: true,
        111: true,
        112: true,
        113: true,
        114: true,
        115: true,
      },
    };
  },
  mounted() {
    for(let i=0;i<this.roomnumbers.length;i++){
      this.disables[this.roomnumbers[i]] = false;
    }
  },
  methods: {
    chooseRoom(roomnumber){
      this.$emit("received", roomnumber);
    },
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
      console.log(this.pageX);
      console.log(this.pageY);
      console.log(document.body.clientWidth);
      console.log(document.body.clientHeight);
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
  left: 215px;
}

.double2 {
  position: relative;
  left: 240px;
}

.double3 {
  position: relative;
  left: 265px;
}

.double4 {
  position: relative;
  left: 295px;
}
.double5 {
  position: relative;
  left: 318px;
}
.up {
  bottom: 20px;
}

.down {
  bottom: -20px;
}

.confirm {
  position: relative;
  left: 40%;
}
</style>
