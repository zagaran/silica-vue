import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api';
import SilicaVue from "../src/export";
Vue.use(VueCompositionAPI);
Vue.use(SilicaVue);
import Local from './Local.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(Local),
}).$mount('#app')