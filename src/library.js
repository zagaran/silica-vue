import Vue from "vue";
import { defaultStyles, mergeStyles } from "@jsonforms/vue2-vanilla";
import DjangoSilicaFormBody from "@/components/django-silica-form-body.vue";
import DjangoSilicaForm from "@/components/django-silica-form.vue";
import Mixins from "@/mixins.js";
import { bootstrapStyles } from "./constants/styles";
import { silicaRenderers } from "./components/renderers";
const exportComponents = { DjangoSilicaFormBody, DjangoSilicaForm };

const rendererEntries = [...silicaRenderers];
const customRendererEntries = [];

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
  mixins: Mixins,
  mergeStyles,
  defaultStyles,
  bootstrapStyles
};
