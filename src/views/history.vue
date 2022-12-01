<template>
  <el-container class="wrapper">
    <el-main class="section text-left">
      <el-row>
        <el-col :span="24">
          <el-card class="box-card">
            <el-row>
              <el-col :span="18">
                当前共查找到<span class="order-num">{{length}}</span>条订单
              </el-col>
              <el-col :span="6" class="text-right">
                <el-button @click="back" type="text" class="order-back">返回</el-button>
              </el-col>
            </el-row>
          </el-card>
        </el-col>

        <el-col :span="24" v-for="(order, index) in orderdata" :key="index">
          <el-card class="box-card">
            <el-row class="text item" :gutter="10">
              <el-col :span="8" class="order-head">
                <div class="text-center">
                  <i class="el-icon-tickets order-icon"></i>
                </div>
                <div class="text-center">
                  <p class="order-id">订单号:</p>
                  <p class="order-id-data">{{order.bookingId}}</p>
                
                </div>
              </el-col>
              <el-col :span="12" class="order-detail">
                <p>酒店：{{order.hotel_name}}</p>
                <p>预订房间类型：{{order.room_type}}</p>
                <p>预订房间号：{{order.room_number}}</p>
                <p>入住时间：{{order.start}}</p>
                <p>离店时间：{{order.end}}</p>            
                <p>费用：{{order.price}}</p>
              </el-col>
              <el-col :span="4">
                <el-button @click="dialogVisible = true" :disabled="false" type="text" class="order-back">评价</el-button>
                <el-button @click="changeVisible = true" :disabled="false" type="text" class="order-back">修改订单</el-button>
              </el-col>
            </el-row>

            <el-dialog title="评价" :visible.sync="dialogVisible" width="80%">
              <span>为我们的服务打个分吧~</span>
              <el-rate v-model="contact.eva" :colors="colors" class="mb-1"></el-rate>
              <el-form :model="contact" status-icon ref="contact" class="mb-1">
                <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 10}" placeholder="输入你的建议或意见吧..." v-model="contact.comment"></el-input>
              </el-form>

              <el-upload
  class="upload-demo"
  action="http://localhost:9091/customer/upload"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :file-list="fileList"
  :data="order.bookingId"
  list-type="picture">
  <el-button size="small" type="primary" class="mt-1">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件,且不超过500kb</div>
</el-upload>

              <span slot="footer" class="dialog-footer">
                <el-button type="danger" @click="dialogVisible = false" class="center">取消</el-button>
                <el-button type="primary" @click="submitBtn(order.bookingId)" class="center">确定</el-button>
              </span>
            </el-dialog>

            <el-dialog title="退款" :visible.sync="changeVisible" width="60%">
              <span>若您想要修改订单，需要取消原订单重新预订。费用会退回您的支付账户中~</span>
              <span slot="footer" class="dialog-footer">
                <el-button type="danger" @click="changeVisible = false" class="center">取消</el-button>
                <el-button type="primary" @click="traceback" class="center">确定</el-button>
              </span>
            </el-dialog>
          </el-card>
        </el-col>
        <el-col :span="24" class="text-center mb-1">
          --- 没有了 ---
        </el-col>
      </el-row>

    </el-main>
  </el-container>
</template>

<script>
  import footbar from "@/components/footbar.vue";
  export default {
    data() {
      return {
      //   headerObj: {
      //   'Content-Type':'multipart/form-data',
      // },
        fileList: [{}],
        dialogVisible: false,
        changeVisible: false,
        contact: {
          comment: '', // 评论
          eva: null, // 评分
        },
        iconstyle: 'el-icon-document-checked',
        disabled: false,
        btnType: 'primary',
        isRealcontact: false,
        colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
        btnText: '提交反馈',
        orderdata: [{
          id:"1",
          hotel_name:"ababab",
          room_type:"oweiryhwk",
          room_number:"1001",
          start:"10-10",
          end:"10-11",
          price:"101",
        }],
        length: '',
      }
    },
    components: {
      footbar,
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      back() {
        this.$router.push("/mine");
      },
      submitBtn(bookingId) {
        console.log(this.contact);
        this.disabled = true;
        this.iconstyle = "el-icon-loading";
        this.axios.post("http://localhost:9091/customer/saveComments", {
          "word": this.contact.comment,
          "score": this.contact.eva,
          "booking_id":String(bookingId),
        })
        .then(res => {
          console.log(res.data);
          if(res.data == true){
            alert("success~~");
          }
					// if (res.data.code == 200) {
					// 	this.iconstyle = "el-icon-check";
					// 	this.btnType = "success";
					// 	this.btnText = "您的反馈已提交！";
					// }
          // else {
					// 	this.iconstyle = "el-icon-close";
					// 	this.btnType = "danger";
					// 	this.btnText = res.data.data;
					// }
        })
        .catch(res => {
          console.log(res);
          this.iconstyle = "el-icon-close";
          this.btnType = "danger";
          this.btnText = "您的反馈未能提交"
        })
        dialogVisible = false;
      },
      traceback() {
        changeVisible = false;
      }
    },
    mounted() {
      this.axios.get("http://localhost:9091/customer/queryBookings")
        .then(res => {
          // console.log(res.data.data);
          console.log(res.data)
          this.orderdata = res.data;
          this.length = this.orderdata.length;
        })
        .catch(res => {
          console.log("wa!");
        })
    }
  }
</script>

<style>
  .text {
    font-size: 14px;
  }

  .item {
    padding: 15px 0 0 0;
  }

  .box-card {
    margin: 1rem;
  }

  .order-icon {
    font-size: 2rem;
  }

  .order-detail p {
    margin-top: 0;
    color: #606266;
  }

  .order-id,
  .order-time {
    margin-bottom: 0;
    color: #303133;
  }

  .order-id-data,
  .order-time-data {
    margin-top: 0.2rem;
    font-size: 0.5rem;
    color: #606266;
  }

  .order-num {
    font-size: 1.3rem;
    color: #E6A23C;
    margin: 0 0.3rem;
  }

  .order-back {
    padding: 5px;
  }
  .center {
    margin-left: 50%;
  }
</style>
