import Vue from 'vue';
import ElementUI from 'element-ui';
import './assets/css/theme/index.css';
import App from './App';
import router from './router';
import axios from 'axios';

Vue.config.productionTip = false;
Vue.use(ElementUI);
axios.defaults.withCredentials = true;
Vue.prototype.$axios = axios;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
