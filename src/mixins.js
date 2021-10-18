import Vue from "vue";
import { jsonSchemaMixin } from "./mixins/jsonSchemaMixin";
const Mixins = {
  jsonSchemaMixin
};

Object.values(Mixins).forEach(mixin => {
  // globally registers components with the Vue instance so they can be used anywhere
  Vue.mixin(mixin);
});

export default {
  Mixins
};
