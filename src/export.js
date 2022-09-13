// https://dev.to/siegerts/consolidating-components-into-a-vue-js-plugin-ndc
import * as components from "./components";
import {version} from '../package.json';
const SilicaVue = {
  install(Vue, options={}) {
    for (const componentName in components) {
      const component = components[componentName];
      Vue.component(componentName, component);
    }
    console.info("Installed Silica-Vue@" + version)
  }
}
export default SilicaVue;

export * from "./components";
export * from "./components/renderers";
export * from "./components/utils";
export * from "./constants";
export * from "./composition";

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(SilicaVue);
}