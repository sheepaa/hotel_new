import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueAxios from 'vue-axios'
import './plugins/element.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router';
import VueWechatTitle from 'vue-wechat-title';
import router from './router';
import './assets/css/custom.css';
import feather from 'feather-icons';
import AMap from 'vue-amap';

import axios from 'axios'
axios.defaults.withCredentials = true;
// axios.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded';
Vue.prototype.$axios = axios

Vue.config.productionTip = false;
Vue.use(ElementUI, { size: 'small', zIndex: 3000 });
Vue.use(VueRouter);
Vue.use(VueWechatTitle);
Vue.use(feather);
Vue.use(VueAxios, axios);
// axios.defaults.baseURL='/api'
Vue.use(AMap);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// (Vue.prototype.$datePickerOptions = {
//   disabledDate(date) {
//     return date && date.valueOf() > Date.now()
//   },
// })

AMap.initAMapApiLoader({
  // 高德key
  key: 'e08497c75d6f0294039bb7faa2b40b0d',
  // 插件集合 （插件按需引入）
  plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PlaceSearch', 'AMap.Geolocation', 'AMap.Geocoder']
});
// $env:NODE_OPTIONS="--openssl-legacy-provider"