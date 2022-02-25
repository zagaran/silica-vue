import Vue, { VNode } from 'vue';
import Dev from './serve.vue';
// To register individual components where they are used (serve.vue) instead of using the
// library as a whole, comment/remove this import and its corresponding "Vue.use" call
import SilicaVue from '@/entry.esm';
Vue.use(SilicaVue);

Vue.config.productionTip = false;

new Vue({
  render: (h): VNode => h(Dev),
}).$mount('#app');
