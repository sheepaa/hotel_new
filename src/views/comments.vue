<template>
  <el-card class="box-card ml-4 mr-4 mb-1 mt-1 transparament">
    <el-row>
      <el-tabs class="title">Comments for {{ $store.state.hotelName }}</el-tabs>
    </el-row>

    <div
      v-for="(item, i) in comments"
      :key="i"
      class="author-title reply-father"
    >
      <el-avatar class="header-img" :size="40" :src="item.headImg"></el-avatar>
      <div class="author-info">
        <span class="author-name">{{ item.customer_id }}</span>
        <span class="score mt-1">评分: {{ item.score }}/5</span>
      </div>
      <div class="talk-box">
        <p>
          <span class="reply mt-1">{{ item.word }}</span>
        </p>
      </div>
      <el-button
        type="text"
        :disabled="false"
        class="mt-1"
        @click="openVideo(item.file_name)"
        >显示图片/视频</el-button
      >
      <el-dialog title="图片/视频" :visible.sync="picVisible" width="60%">
        <span>[pic]</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="picVisible = false" class="mb-1"
            >返回</el-button
          >
        </span>
      </el-dialog>
    </div>

    <el-button @click="back" type="danger" class="mb-1">返回</el-button>
    <el-button @click="backshou" type="danger" class="mb-1">我的收藏</el-button>
  </el-card>
</template>

<script>
export default {
  name: "comments",
  data() {
    return {
      commentVisible: false,
      picVisible: false,
      btnShow: false,
      index: "0",
      replyComment: "",
      myName: "Lana Del Rey",
      myHeader:
        "https://ae01.alicdn.com/kf/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg",
      myId: 19870621,
      to: "",
      toId: -1,
      comments: [
        {
          customer_id: "Lana Del Rey",
          score: 0,
          id: 19870621,
          headImg:
            "https://ae01.alicdn.com/kf/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg",
          word: "Cet hôtel est aussi nul que de la merde.",
          time: "2019年9月16日 18:43",
          commentNum: 2,
          score: 15,
          inputShow: false,
          reply: [],
        },
        {
            customer_id: "Taylor Swift",
          score: 0,
          id: 19891221,
          headImg:
            "https://ae01.alicdn.com/kf/H94c78935ffa64e7e977544d19ecebf06L.jpg",
          word: "このホテルは糞と同じくらい腐っていて、二度と来ない",
          time: "2019年9月16日 18:43",
          commentNum: 1,
          score: 5,
          inputShow: false,
          reply: [],
        },
        {
            customer_id: "Norman Fucking Rockwell",
          score: 0,
          id: 20190830,
          headImg:
            "https://ae01.alicdn.com/kf/Hdd856ae4c81545d2b51fa0c209f7aa28Z.jpg",
          word: "This hotel is as bad as shit. It won't come again",
          time: "2019年9月16日 18:43",
          commentNum: 0,
          score: 5,
          inputShow: false,
          reply: [],
        },
      ],
    };
  },
  methods: {
    openVideo(file_name){
        window.open("http://localhost:9091/customer/video/"+file_name)
    },
    back() {
      this.$router.push("/findhotel");
    },
    init() {
      console.log("456");
      this.commentVisible = true;
      console.log("123");
    },
    close() {
      this.commentVisible = false;
    },
  },
  mounted() {
    this.axios
      .post("http://localhost:9091/customer/viewComments", {
        hotel_name: this.$store.state.hotelName,
      })
      .then((res) => {
        console.log(res.data);
        this.comments = res.data;
      })
      .catch((res) => {
       
      });
  },
};
</script>

<style scoped lang="css">
.ml-4 {
  margin-left: 4rem;
}
.mr-4 {
  margin-right: 4rem;
}
.title {
  font-family: fang;
  font-size: 2rem;
  font-weight: lighter;
  margin-top: 1rem;
  color: #21052b;
  stroke-width: 4px;
}

.author-title:not(:last-child) {
  border-bottom: 1px solid rgba(178, 186, 194, 0.8);
  margin-top: 2rem;
}

.author-title {
  margin-top: 1rem;
  padding: 10px;
}

.author-title .header-img {
  display: inline-block;
  vertical-align: top;
}

.author-title .author-info {
  display: inline-block;
  margin-left: 5px;
  width: 60%;
  height: 40px;
  line-height: 20px;
}

.author-title .author-info > span {
  display: block;
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.author-title .author-info .author-name {
  color: #000;
  font-size: 18px;
  font-weight: bold;
}

.score {
  color: rgb(255, 115, 0);
  font-size: 14px;
  font-weight: bold;
}

.author-title .author-info .author-time {
  font-size: 14px;
}

.author-title .icon-btn {
  width: 30%;
  padding: 0 !important;
  float: right;
}

@media screen and (max-width: 1200px) {
  .author-title .icon-btn {
    width: 20%;
    padding: 7px;
  }
}

.author-title .icon-btn > span {
  cursor: pointer;
}

.author-title .icon-btn .iconfont {
  margin: 0 5px;
}

.author-title .talk-box {
  margin: 0 50px;
}

.author-title .talk-box > p {
  margin: 0;
}

.author-title .talk-box .reply {
  font-size: 16px;
  color: #000;
}

.author-title .reply-box {
  margin: 10px 0 0 50px;
  background-color: #efefef;
}
</style>
