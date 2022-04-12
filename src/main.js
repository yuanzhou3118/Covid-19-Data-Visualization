import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import axios from 'axios';
Vue.prototype.$axios = axios;
//配置请求的根路径
axios.defaults.baseURL = '/api';

Vue.config.productionTip = false;
Vue.use(ElementUI, { size: 'small' });

new Vue({
  render: (h) => h(App),
}).$mount('#app');
