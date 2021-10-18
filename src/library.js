import Vue from "vue";
import {
  defaultStyles,
  mergeStyles,
  vanillaRenderers
} from "@jsonforms/vue2-vanilla";
import { entry as CustomTextRenderer } from "@/components/CustomTextRenderer.vue";
import DjangoSilicaFormLite from "@/components/django-silica-form-lite.vue";
import DjangoSilicaForm from "@/components/django-silica-form.vue";
import Mixins from "@/mixins.js";
const exportComponents = { DjangoSilicaFormLite, DjangoSilicaForm };

const rendererEntries = [...vanillaRenderers];
const customRendererEntries = [CustomTextRenderer];

const bootstrapStyles = {
  control: {
    root: "form-group",
    wrapper: "wrapper",
    label: "form-label",
    description: "description",
    input: "form-control",
    error: "error",
    textarea: "text-area",
    select: "select",
    option: "option"
  },
  verticalLayout: {
    root: "vertical-layout",
    item: "vertical-layout-item"
  },
  horizontalLayout: {
    root: "horizontal-layout",
    item: "horizontal-layout-item"
  },
  group: {
    root: "group",
    label: "group-label",
    item: "group-item"
  },
  arrayList: {
    root: "array-list",
    legend: "array-list-legend",
    addButton: "array-list-add",
    label: "array-list-label",
    itemWrapper: "array-list-item-wrapper",
    noData: "array-list-no-data",
    item: "array-list-item",
    itemToolbar: "array-list-item-toolbar",
    itemLabel: "array-list-item-label",
    itemContent: "array-list-item-content",
    itemExpanded: "expanded",
    itemMoveUp: "array-list-item-move-up",
    itemMoveDown: "array-list-item-move-down",
    itemDelete: "array-list-item-delete"
  },
  label: {
    root: "label-element"
  }
};

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
