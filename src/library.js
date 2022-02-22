import Vue from "vue";
import { defaultStyles, mergeStyles } from "@jsonforms/vue2-vanilla";
import DjangoSilicaFormBody from "@/components/django-silica-form-body.vue";
import DjangoSilicaForm from "@/components/django-silica-form.vue";
import { bootstrap3Styles, bootstrap4Styles } from "./constants/styles";
import { default as mixins } from "@/mixins";
import { silicaRenderers } from "@/components/renderers";

const exportComponents = { DjangoSilicaFormBody, DjangoSilicaForm };

const rendererEntries = [...silicaRenderers];

const renderers = Object.fromEntries(
  rendererEntries.map(r => [r.renderer.name, r])
);

const SilicaComponents = { ...exportComponents, ...renderers };

Object.keys(SilicaComponents).forEach(name => {
  Vue.component(name, SilicaComponents[name]);
});

export default {
  components: exportComponents,
  renderers: rendererEntries,
  mixins,
  mergeStyles,
  defaultStyles,
  bootstrap3Styles,
  bootstrap4Styles
};
