import Vue from "vue";
const Components = {};

Object.keys(Components).forEach(name => {
  // globally registers components with the Vue instance so they can be used anywhere
  Vue.component(name, Components[name]);
});
