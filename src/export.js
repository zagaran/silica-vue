// https://dev.to/siegerts/consolidating-components-into-a-vue-js-plugin-ndc
import * as components from "./lib-components";
const SilicaVue = {
  install(Vue, options={}) {
    for (const componentName in components) {
      const component = components[componentName];
      Vue.component(componentName, component);
    }
  }
}

export default SilicaVue;

export * from "./lib-components";
export * from "./lib-components/renderers";
export * from "./lib-components/utils";
export * from "./lib-constants";

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(SilicaVue)
}