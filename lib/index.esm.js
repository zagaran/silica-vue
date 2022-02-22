import Vue from 'vue';
import { mergeStyles, defaultStyles } from '@jsonforms/vue2-vanilla';
import DjangoSilicaFormBody from '@/components/django-silica-form-body.vue';
import DjangoSilicaForm from '@/components/django-silica-form.vue';
import mixins from '@/mixins';
import { silicaRenderers } from '@/components/renderers';

const bootstrap3Styles = {
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
  },
  categorization: {
    label: "categorization-label",
    root: "categorization-root",
    item: "categorization-item",
    selector: "btn",
    activeCategory: "btn btn-info"
  },
  category: {
    label: "category-label",
    root: "category-root",
    item: "category-item"
  }
};

const bootstrap4Styles = {
  control: {
    root: "form-group",
    wrapper: "wrapper",
    label: "form-label",
    description: "description",
    input: {
      default: "form-control",
      boolean: "form-input"
    },
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
  },
  categorization: {
    label: "categorization-label",
    root: "categorization-root",
    item: "categorization-item",
    selector: "btn",
    activeCategory: "btn btn-info"
  },
  category: {
    label: "category-label",
    root: "category-root",
    item: "category-item"
  }
};

const exportComponents = { DjangoSilicaFormBody, DjangoSilicaForm };

const rendererEntries = [...silicaRenderers];

const renderers = Object.fromEntries(
  rendererEntries.map(r => [r.renderer.name, r])
);

const SilicaComponents = { ...exportComponents, ...renderers };

Object.keys(SilicaComponents).forEach(name => {
  Vue.component(name, SilicaComponents[name]);
});

var library = {
  components: exportComponents,
  renderers: rendererEntries,
  mixins,
  mergeStyles,
  defaultStyles,
  bootstrap3Styles,
  bootstrap4Styles
};

export { library as default };
//# sourceMappingURL=index.esm.js.map
