import Vue from 'vue';
import Dev from './serve.vue';
import VueCompositionAPI from '@vue/composition-api'

Vue.use(VueCompositionAPI)
// To register individual components where they are used (serve.vue) instead of using the
// library as a whole, comment/remove this import and its corresponding "Vue.use" call
import SilicaVue from '@/export';
Vue.use(SilicaVue);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(Dev),
}).$mount('#app');
