// https://dev.to/siegerts/consolidating-components-into-a-vue-js-plugin-ndc
import * as components from "./components";
const SilicaVue = {
  install(Vue, options={}) {
    for (const componentName in components) {
      const component = components[componentName];
      Vue.component(componentName, component);
    }
  }
}
export default SilicaVue;

export * from "./components";
export * from "./components/renderers";
export * from "./components/utils";
export * from "./constants";

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(SilicaVue);
}