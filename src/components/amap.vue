<template>
  <div class="my-container">
    {{ name }}
    <div id="map-demo"></div>
  </div>
</template>

<script>
import createInfoWindow from "@/utils/amap";
import store from "./../store";
export default {
  data() {
    return {
      // name:'测试',
      map: null,
      infoWindow: null,
      closeImg: require("@/assets/close.png"),
      pointList: [
        { address: "广州", local: [113, 23] },
        { address: "北京", local: [116.33333, 39.98] },
        { address: "上海", local: [121, 31] },
        { address: "香港", local: [114.1, 22.3] },
      ],
      winInfo: [],
      winTitle: "",
      markList: [],
    };
  },
  mounted() {
    this.carGPSIP();
  },
  methods: {
    carGPSIP() {
      let self = this;
      this.map = new AMap.Map("map-demo", {
        resizeEnable: true,
        zoom: 8, //级别
        center: [113.663221, 34.7568711], //中心点坐标
        viewMode: "2D", //使用3D视图
        mapStyle: "amap://styles/graffiti",
      }); //初始化地图

      //遍历生成多个标记点
      for (var i = 0, marker; i < this.pointList.length; i++) {
        var marker = new AMap.Marker({
          position: this.pointList[i].local, //不同标记点的经纬度
          map: self.map,
        });

        marker.title = this.pointList[i].address;
        marker.content = JSON.stringify([
          "电话：" + "123456789",
          "地址：" + this.pointList[i].address,
          "位置：" + this.pointList[i].local,
        ]);
        marker.on("click", self.markerClick);
        // marker.emit("click", { target: marker }); //默认初始化不出现信息窗体,打开初始化就出现信息窗体
      }

      //实例化信息窗体
      this.infoWindow = new AMap.InfoWindow({
        isCustom: true, //使用自定义窗体
        content: self.winInfo,
        offset: new AMap.Pixel(15, -35),
      });
      this.map.setFitView();
    },
    // 点标记点击事件
    markerClick(e) {
      let self = this;
      this.winInfo = JSON.parse(e.target.content);
      this.winTitle = e.target.title;
      // 设置窗体内容
      this.infoWindow.setContent(
        createInfoWindow.createInfoWindow(
          self.winTitle,
          self.winInfo.join("<br/>"),
          function () {
            // 关闭窗体
            self.map.clearInfoWindow();
          }
        )
      );
      this.$store.state.city = e.target.title;
      // 打开窗体
      self.infoWindow.open(self.map, e.target.getPosition());
    },
  },
};
</script>

<style scoped>
#map-demo {
  width: 70rem;
  height: 46rem;
  margin: auto;
  border: 1rem solid blueviolet;
  border-radius: 1em;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.8);
  padding: 1em 2em 2em;
}
</style>
