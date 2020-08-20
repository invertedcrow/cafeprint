import 'core-js/stable';
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import store from './store/'
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import interceptorSetup from './interceptors/interceptor';

Vue.use(VueAxios, axios)
Vue.use(PerfectScrollbar)
export const eventBus = new Vue();

interceptorSetup();

Vue.use(BootstrapVue);

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
