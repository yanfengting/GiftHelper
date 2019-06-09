import Vue from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import store from './store';
import 'vant/lib/index.css';
// import '../../base/src/main'
Vue.prototype.axios = axios;

// 原生ajax、axios请求时，如果不显示的设置Content-Type，那么默认是text/plain，这时服务器就不知道怎么解析数据了，所以才只能通过获取原始数据流的方式来进行解析请求数据。
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.config.productionTip = false;
// 选中地址跳转
router.beforeEach((to, from, next) => {
  if (to.name === '/address' && from.name === 'order') {
    store.state.isSelectAddress = true;
  } else {
    store.state.isSelectAddress = false;
  }
  next();
});
// document.cookie = '_id=5cfc50cabbf1d0051ea321b4';
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
