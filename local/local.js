import Vue from 'vue'
import SilicaVue from "../src/export";
Vue.use(SilicaVue);
import Local from './Local.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(Local),
}).$mount('#app')