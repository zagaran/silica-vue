import Vue from "vue";
import {
  defaultStyles,
  mergeStyles,
  vanillaRenderers
} from "@jsonforms/vue2-vanilla";
import { entry as CustomTextRenderer } from "@/components/controls/CustomTextRenderer.vue";
import { entry as CategorizationRenderer } from "@/components/layout/Categorization.vue";
import { entry as CategoryRenderer } from "@/components/layout/Category.vue";
import DjangoSilicaFormBody from "@/components/django-silica-form-body.vue";
import DjangoSilicaForm from "@/components/django-silica-form.vue";
import Mixins from "@/mixins.js";
import { bootstrapStyles } from "./components/constants/styles";
const exportComponents = { DjangoSilicaFormBody, DjangoSilicaForm };

const rendererEntries = [
  ...vanillaRenderers,
  CategorizationRenderer,
  CategoryRenderer
];
const customRendererEntries = [CustomTextRenderer];

const renderers = Object.fromEntries(
  rendererEntries.map(r => [r.renderer.name, r])
);

const customRenderers = Object.fromEntries(
  customRendererEntries.map(r => [r.renderer.name, r])
);

const VueComponents = { ...exportComponents, ...renderers, ...customRenderers };

Object.keys(VueComponents).forEach(name => {
  Vue.component(name, VueComponents[name]);
});

export default {
  components: exportComponents,
  renderers: rendererEntries,
  customRenderers: customRenderers,
  defaultStyles,
  bootstrapStyles,
  mergeStyles,
  mixins: Mixins
};
