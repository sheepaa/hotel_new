<template>
    <el-dialog title="房间平面分布" :visible.sync="detailVisible" width="90%">
        <el-card class="box-card ml-4 mr-4 mb-1 mt-1 transparament">
            <img :src="pingmiantest" @click="a" alt="" class="imagee" />
        </el-card>
    </el-dialog>
  
</template>
<script>
export default {
    name: "dialogComponent",
  data() {
    return {
        detailVisible:false,
        pingmiantest: require("@/assets/img/pingmian_final.jpg"),
    };
  },
  methods: {
    init(data){
        this.detailVisible=true;
        console.log(data);
    },
    a(e) {
      this.pageX = e.x;
      this.pageY = e.y; //鼠标点击位置
      this.clientWidth = document.body.clientWidth / 17.978;
      this.clientHeight = document.body.clientHeight / 3;
      // console.log(this.pageX)
      // console.log(this.pageY)
      // console.log(document.body.clientWidth)
      // console.log(document.body.clientHeight)
      if (
        this.pageX >= 4.55 * this.clientWidth &&
        this.pageX < 5.55 * this.clientWidth &&
        this.pageY < this.clientHeight
      ) {
        console.log("1");
      } else if (
        this.pageX >= 5.55 * this.clientWidth &&
        this.pageX < 6.55 * this.clientWidth &&
        this.pageY < this.clientHeight
      ) {
        console.log("2");
      } else if (
        this.pageX >= 6.55 * this.clientWidth &&
        this.pageX < 7.55 * this.clientWidth &&
        this.pageY < this.clientHeight
      ) {
        console.log("3");
      } else if (
        this.pageX >= 7.55 * this.clientWidth &&
        this.pageX < 8.55 * this.clientWidth &&
        this.pageY < this.clientHeight
      ) {
        console.log("4");
      } else if (
        this.pageX >= 8.55 * this.clientWidth &&
        this.pageX < 9.55 * this.clientWidth &&
        this.pageY < this.clientHeight
      ) {
        console.log("5");
      } else if (
        this.pageX >= 9.55 * this.clientWidth &&
        this.pageX < 10.55 * this.clientWidth &&
        this.pageY < this.clientHeight
      ) {
        console.log("6");
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
