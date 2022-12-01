import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

    city:"",
    hotelName:"Beijing OOAD hotel DaXing branch",
    //订单模块
    order:{
      // hotelName:state.hotelName,
      outTradeNo:"",
      phone_number:"",
      hotelName:"",
      roomType:"",
      start:"",
      end:"",
      priceEach:"",
      priceTotal:"",
      roomNumber:"",
      
    },
    position: "findhotel",
    searchSet: {},
    // searchTime: {
    //   inTime: '',
    //   leaveTime: '',
    // },
		bookstat: {
			roomType: '',
			roomid: '',
			inTime: '',
			leaveTime: '',
		}
  },
  mutations: {
    // //根据入住时段搜索room
    // setRoomInfo(state, data){
    //   state.searchSet = data
    // },
    
    //设置order的start和end
    setDate(state, [start, end]){
      state.order.start = start;
      state.order.end = end;
    },
    setHotelName(state,hotelName){
      state.hotelName = hotelName;
    },
    setOrder(state, [hotel_name, room_type, start, end, price, priceTotal]){
      state.order.hotelName = hotel_name;
      state.order.roomType = room_type;
      state.order.start = start;
      state.order.end = end;
      state.order.priceEach = price;
      state.order.priceTotal = priceTotal;
    },
    setHotelName(state, name){
      state.hotelName = name
    },
    setFind(state) {
      state.position = "findroom";
    },
    setRes(state) {
      state.position = "resveration";
    },
    setMine(state) {
      state.position = "mine";
    },
    setFindh(state) {
      state.position = "findhotel";
    }
  },
  actions: {
    //处理priceTotal
    SetOrder(context, [hotel_name, room_type, start, end, price]){
      let startDate = new Date(start);
      let endDate = new Date(end);
      let diff = (endDate.getTime() - startDate.getTime())/86400000;
      let priceTotal = Number(price) * diff;
      context.commit("setOrder",[hotel_name, room_type, start, end, price, priceTotal]);
    }
  },
  modules: {
  }
})
