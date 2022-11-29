<template>
	<div>
		<el-container class="wrapper">
			<div :style="{width:'100%',height:'80px'}">
				<el-tabs class="title">欢迎使用酒店预订</el-tabs>
			</div>
		<el-main class="section">
			<div class="amap-page-container">
				<div>
					<amap ></amap>
				</div>
			</div>

			<el-col :span="22" v-for="(hotel, index) in listdata" :key="index" :offset="0" class="hotel-card">
            <el-card :body-style="{ padding: '2rem'}" class="purple" v-if="hotel.hotel_name==$store.state.city">
              <el-row>
                <el-col :span="5">
                  <img :src="hotel.photo" alt="" class="image" />
                </el-col>
                <el-col :span="19">
                  <div style="padding: 14px" class="text-left hotel">
                    <p class="hotel-title">
                      {{ hotel.hotel_name }}
                    </p>
                    <p class="hotel-intro">{{ hotel.intro }}</p>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          	</el-col>
			

		</el-main>
		<el-footer class="footer">
			<footbar></footbar>
		</el-footer>
		</el-container>
	</div>
</template>

<script>
import footbar from "@/components/footbar.vue";
import amap from '../components/amap.vue';
	export default {
		data() {
			const self = this;
			return {

				listdata: [{
					hotel_name: '香港',
					photo: require("../assets/img/Hongkong.jpg"),
					intro: '开业90年，半岛乃全球豪华酒店业翘楚，时至今天继续为全球顶级酒店奠立高水平新标准。今年，《福布斯旅游指南》年度星级评级名单上，半岛酒店集团旗下十间半岛酒店皆获五星级评，成为《福布斯旅游指南》评选史上初次有酒店集团旗下所有酒店均荣获五星评级的酒店品牌。作为旗舰酒店的香港半岛延续「远东贵妇」的传奇，经典尊贵的气派无与伦比，高雅风采恒久隽永，融合了东西方待客之道的精髓。下榻半岛酒店，重新感受早些年代的旅游璀璨魅力，并观赏酒店内摆放的众多古迹文物。'
					// feature: 'da'
				},{
					hotel_name: '广州',
					photo: require("../assets/img/Guangzhou.jpg"),
					intro: '广州中国大酒店坐落于风景怡人的越秀公园与流花湖公园的环抱中，紧邻历史悠久的西汉南越王博物馆，是广州唯一由国际管理集团管理的五星级酒店，更是万豪国际集团在这个发展迅速的大都会的旗舰酒店。. 广州及南中国在过去二十多年急促转型，经济及文化发展多元迅速，在国际间占据举足轻重的地位，推动酒店业蓬勃发展。. 酒店雄踞广州市中心，尽占地利优势，与火车站相距咫尺，毗邻中国出口商品交易会，酒店门外连接贯通南北、东西主干地铁，位置极为便利。. 离机场距离（公里）：33. 离火车站距离（公里）：2. 离市中心距离（公里）：3. 离广州火车站距离（公里）：2. 周围景观：流花会馆、临近越秀公园、流花公园、中山纪念堂、南越王墓、陈家祠. 酒店地址：广州市流花路（流花交易会馆旁）'
					// feature: 'da'
				},{
					hotel_name: '上海',
					photo: require("../assets/img/Shanghai.jpg"),
					intro: '上海大酒店位于上海最繁华的外滩-南京东路商务休闲圈内，毗邻中华第一街——南京东路步行街，与世纪广场仅一步之隔。上海大酒店拥有豪华客/套房。超大的空间，典雅的设计，周到的服务，令您畅享舒适、豪华、温馨的独特氛围。一楼咖啡厅可享受上海都市的浪漫情调，二楼法国餐厅提供经典纯正的法式菜肴，除了无柱式、7米超高空间的设计概念外，酒店还配备领先的高科技会议设施，加上宽敞的序厅和另两个可分割式多功能厅。'
					// feature: 'da'
				},{
					hotel_name: '北京',
					photo: require("../assets/img/Beijing.jpg"),
					intro: '北京国贸大酒店傲然耸立于北京中央商务区（CBD）核心地带，雄踞于81层国贸大厦的上层部分。酒店紧邻国贸商城，店铺琳琅满目，有上百家餐厅和酒吧。酒店房间面积从55平米起，室内均为落地窗设计，京城美景一览无余。乘坐电梯至64层即可到达北京国贸大酒店前台。步入酒店大堂，富有现代感的设计风格，将西方视觉张力与东方含蓄之美优雅地融为一体。漫步云端，感觉世界就在脚下。位于大厦64-80层，在西面朝向的客房和套房内可观赏3公里以外故宫之巅的迷人景观；位于64层的贵宾堂全天候供应咖啡、茶、软饮、果汁及茶点小食位于酒店78层的室内恒温无边游泳池四间设计独特的餐厅、一间酒吧、一个酒廊以及四个优雅的私属用餐空间'
					// feature: 'da'
				}],

				center: [121.59996, 31.197646],
				lng: 0,
				lat: 0,
				loaded: false,
				plugin: [{
					enableHighAccuracy: true,//是否使用高精度定位，默认:true
					timeout: 100,          //超过10秒后停止定位，默认：无穷大
					maximumAge: 0,           //定位结果缓存0毫秒，默认：0
					convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
					showButton: true,        //显示定位按钮，默认：true
					buttonPosition: 'RB',    //定位按钮停靠位置，默认：'LB'，左下角
					showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
					showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
					panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
					zoomToAccuracy:true,//定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：f
					extensions:'all',
					pName: 'Geolocation',
					events: {
						init(o) {// o 是高德地图定位插件实例
							o.getCurrentPosition((status, result) => {
								console.log(result)
								if (result && result.position) {
									self.lng = result.position.lng;
									self.lat = result.position.lat;
                      				self.center = [self.lng, self.lat];
                      				self.loaded = true;
                      				self.$nextTick();
								}
							});
						}
					}
				}]
			}
		},
		components: {
			footbar,
			amap,
		},
		methods: {
		},
		mounted() {
		}
	}
</script>

<style scoped="scoped">
	.amap-demo {
		width: 80%;
		height: 600px;
		margin: auto;
	}

	.title {
		font-size: 50px;
		color: rgb(195, 171, 199)
	}

	.box-card {
		height: 30vh;
		margin: -7rem 1rem 0;
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

	.image {
		width: 50%;
		display: block;
		padding: 0rem;
		border: 1px solid transparent;
		border-radius: 20px;
	}

	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}

	.clearfix:after {
		clear: both
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
		margin: 0.5rem 4rem 0 4rem;
		/* background: #ffefa7; */
		background-color: rgba(255, 255, 255, 0.8);
		color: #ffefa7;
	}

	.purple {
		background-color: #aa94ff;
	}
</style>