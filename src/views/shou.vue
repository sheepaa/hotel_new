<template>
<div class="fang" >
    <div>
        <el-tabs class="title">我的收藏</el-tabs>
    </div>
    <el-col :span="22" v-for="(hotel, index) in hotel_list" :key="index" class="hotel-card">
        <el-card :body-style="{ padding: '2rem' }" class="purple" v-if=true >
            <el-row class="mt-1 purple">
              <el-col :span="5">
                <img :src="hotel.photo" alt="" class="image" />
              </el-col>
              <el-col :span="15">
                <div style="padding: 14px" class="text-left hotel">
                  <p class="hotel-title">
                    {{ hotel.hotel_location }}
                  </p>
                  <p class="hotel-intro">{{ hotel.intro }}</p>
                </div>
              </el-col>
              <el-col :span="4" class="enter">
                <el-row>
                <el-button @click="toFindRoom(hotel)" type="primary"  size="medium" class="fang" >Enter</el-button>
                <el-button @click="showcomments()" type="primary"  size="medium" class="fang" >Comments</el-button>
                </el-row>
            </el-col>
            </el-row>
          </el-card>
        </el-col>
    </div>
</template>

<script>
import footbar from "@/components/footbar.vue";
import amap from "../components/amap.vue";
import comments from "@/views/comments.vue";
export default {
 
  data() {
    const self = this;
    return {
      isChecked: true,
      Visible1:false,
      name_id_map:{
        "HongKong OOAD hotel WangJiao buranch":0,
        "GuangZhou OOAD hotel XiaJiao branch":1,
        "ShangHai OOAD hotel Century Avenue branch":2,
        "Beijing OOAD hotel DaXing branch":3

      },
      hotel_name_list:[],
      hotel_list:[],
      listdata: [
        {
          hotel_location: "香港",
          hotel_name: "HongKong OOAD hotel WangJiao buranch",
          photo: require("../assets/img/Hongkong.jpg"),
          intro:
            "In its 90 years of operation, the Peninsula has been a leader in the global luxury hotel industry and continues to set a new high standard for top hotels in the world. This year, all 10 of its Peninsula hotels received five-star ratings on Forbes Travel Guide's annual star rating list, making it the first time in the history of Forbes Travel that all of the group's hotels received five-star ratings. As a flagship hotel, the Peninsula Hong Kong continues the legend of the Lady of the Far East, with an incomparable style and timeless elegance, combining the best of Eastern and Western hospitality. Stay at the Peninsula Hotel and feel the glamorous charm of travel in the early years, as well as appreciate the numerous historical relics displayed in the hotel.",
        },
        {
          hotel_location: "广州",
          hotel_name: "GuangZhou OOAD hotel XiaJiao branch",
          photo: require("../assets/img/Guangzhou.jpg"),
          intro:
            "Surrounded by the scenic Yuexiu Park and Liuhua Lake Park, and close to the historic Nanyue King Museum of the Western Han Dynasty, China Hotel Guangzhou is the only five-star hotel managed by an international management group in Guangzhou, and the flagship hotel of Marriott International in this rapidly growing metropolis. In the past 20 years, Guangzhou and South China have undergone rapid transformation, rapid diversification of economic and cultural development, and occupy a pivotal position in the international hotel industry, which promotes the vigorous development of the hotel industry. Located in the center of Guangzhou, the hotel occupies an area of advantage, and is close to the railway station, adjacent to the China Export Commodities Fair, outside the hotel connecting the north and south, east and west main subway, the location is very convenient.",
        },
        {
          hotel_location: "上海",
          hotel_name: "ShangHai OOAD hotel Century Avenue branch",
          photo: require("../assets/img/Shanghai.jpg"),
          intro:
            "Shanghai Grand Hotel is located in the business and leisure area of East Nanjing Road, the most prosperous Bund in Shanghai. It is adjacent to Zhonghua First Street -- East Nanjing Road Pedestrian Street, and is only one step away from Century Square. Shanghai Grand Hotel has deluxe guest/suites. Large space, elegant design, thoughtful service, so that you enjoy a comfortable, luxurious, warm unique atmosphere. The cafe on the first floor can enjoy the romantic atmosphere of Shanghai city, and the French restaurant on the second floor provides classic and authentic French cuisine. In addition to the design concept of column free, 7-meter high space, the hotel is also equipped with leading high-tech conference facilities, plus a spacious lobby and two other divisible multi-function rooms. ",
          // feature: 'da'
        },
        {
          hotel_location: "北京",
          hotel_name: "Beijing OOAD hotel DaXing branch",
          photo: require("../assets/img/Beijing.jpg"),
          intro:
            "The World Trade Hotel Beijing stands proudly in the heart of Beijing's central business District (CBD), perched on the upper floors of the 81-story World Trade Tower. The hotel is adjacent to the International Trade Mall, with a variety of shops and hundreds of restaurants and bars. Rooms start at 55 square meters and feature floor-to-ceiling Windows that offer panoramic views of the city. Take the elevator to the 64th floor to the front desk of Beijing International Trade Hotel. Step into the hotel lobby, full of modern design style, Western visual tension and Oriental implicit beauty gracefully integrated. Walk in the clouds, feel the world beneath your feet. Located on the 64th-80th floor of the building, the west facing guestrooms and suites offer stunning views of the top of the Forbidden City, 3 kilometers away.",
        },
      ],

      center: [121.59996, 31.197646],
      lng: 0,
      lat: 0,
      loaded: false,
      plugin: [
        {
          enableHighAccuracy: true, //是否使用高精度定位，默认:true
          timeout: 100, //超过10秒后停止定位，默认：无穷大
          maximumAge: 0, //定位结果缓存0毫秒，默认：0
          convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
          showButton: true, //显示定位按钮，默认：true
          buttonPosition: "RB", //定位按钮停靠位置，默认：'LB'，左下角
          showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
          showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
          panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
          zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：f
          extensions: "all",
          pName: "Geolocation",
          events: {
            init(o) {
              // o 是高德地图定位插件实例
              o.getCurrentPosition((status, result) => {
                console.log(result);
                if (result && result.position) {
                  self.lng = result.position.lng;
                  self.lat = result.position.lat;
                  self.center = [self.lng, self.lat];
                  self.loaded = true;
                  self.$nextTick();
                }
              });
            },
          },
        },
      ],
    };
  },
  components: {
    footbar,
    amap,
    comments,
  },
  mounted(){
    this.axios.get("http://localhost:9091/customer/getFork")
    .then((res) => {
        console.log(res.data);
        this.hotel_name_list = res.data;
        for(let i=0;i<this.hotel_name_list.length;i++){
          let index = this.name_id_map[this.hotel_name_list[i]];
          this.hotel_list.append(this.listdata[index]);
        }
        console.log(this.hotel_list)
      })
      .catch((res) => {
      
      });
  },
  methods: {
    cli() {
      if(this.isChecked){
        this.isChecked = false
      }else{
        this.isChecked = true
      }
    },
    toFindRoom(hotel) {
      this.$store.commit("setHotelName", hotel.hotel_name);
      this.$router.push("/findroom");
      this.$refs.footbar.findBtn();
      console.log("ok");
    },
    showcomments(){
      // console.log("qwert")
      // this.Visible1=true;
      // this.$nextTick(()=>{
      //   console.log("nexttick")
      //   this.$refs.dialog_comment.init();
      //   console.log("bmw")
      // })
      
      this.$router.push("/comments");
    }
  },
  components: {
    amap,
    comments,
    footbar
  }
};
</script>

<style scoped="scoped">
.tool-icon {
    font-size: 2rem;
    margin: 0.5rem 0;
  } 
.title {
  font-size: 40px;
  font-family: fang;
  color: rgb(56, 6, 98);
  border: 4px;
}

.image {
  width: 65%;
  display: block;
  padding: 0rem;
  border: 1px solid transparent;
  border-radius: 20px;
}

.hotel p {
  margin-bottom: 0.25rem;
  margin-top: 0;
}

.hotel-title {
  font-size: 1.2rem;
  font-weight: bolder;
  color: #303133;
}

.hotel-intro {
  font-size: 0.9rem;
  color: #606266;
}

.hotel-card {
  margin: 0.2rem 4rem 0 4rem;
  /* background: #ffefa7; */
  background-color: rgba(255, 255, 255, 0.8);
  /* border-radius: 1600px; */
  color: #ffefa7;
}

.purple {
  background-color: #aa94ff;
}

.enter {
  position: relative;
  top:5rem;
}

.info {
    color: rgb(247, 160, 30);
  }
</style>