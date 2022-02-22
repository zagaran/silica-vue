import { entry as CustomTextRendererEntry } from "./CustomTextRenderer.vue";
import Vue from "vue";

const customRendererEntries = [
  CustomTextRendererEntry,
];

const customRenderers = Object.fromEntries(
  customRendererEntries.map(r => [r.renderer.name, r])
);

Object.keys(customRenderers).forEach(name => {
  Vue.component(name, customRenderers[name]);
});

window.SilicaVueCustomRenderers = customRendererEntries;

export const renderers = customRendererEntries;
