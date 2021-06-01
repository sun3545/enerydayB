import Vue from 'vue';
// v-charts
import VCharts from 'v-charts-v2';
import * as echarts from 'echarts/lib/echarts';
import { GridComponent } from 'echarts/components';

import App from './App.vue';
import router from './router';
import store from './store';
// antDesign
import './plugins/ant-design-vue';
import './styles/reset.less';
// 使用 axios获取数据
import Api from './api/index';

Vue.prototype.$api = Api;
Vue.config.productionTip = false;
// v-charts
echarts.use([GridComponent]);
Vue.use(VCharts);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
