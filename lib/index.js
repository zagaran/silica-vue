'use strict';

var Vue = require('vue');
var vue2Vanilla = require('@jsonforms/vue2-vanilla');
var DjangoSilicaFormBody = require('@/components/django-silica-form-body.vue');
var DjangoSilicaForm = require('@/components/django-silica-form.vue');
var mixins = require('@/mixins');
var renderers$1 = require('@/components/renderers');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Vue__default = /*#__PURE__*/_interopDefaultLegacy(Vue);
var DjangoSilicaFormBody__default = /*#__PURE__*/_interopDefaultLegacy(DjangoSilicaFormBody);
var DjangoSilicaForm__default = /*#__PURE__*/_interopDefaultLegacy(DjangoSilicaForm);
var mixins__default = /*#__PURE__*/_interopDefaultLegacy(mixins);

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

const exportComponents = { DjangoSilicaFormBody: DjangoSilicaFormBody__default["default"], DjangoSilicaForm: DjangoSilicaForm__default["default"] };

const rendererEntries = [...renderers$1.silicaRenderers];

const renderers = Object.fromEntries(
  rendererEntries.map(r => [r.renderer.name, r])
);

const SilicaComponents = { ...exportComponents, ...renderers };

Object.keys(SilicaComponents).forEach(name => {
  Vue__default["default"].component(name, SilicaComponents[name]);
});

var library = {
  components: exportComponents,
  renderers: rendererEntries,
  mixins: mixins__default["default"],
  mergeStyles: vue2Vanilla.mergeStyles,
  defaultStyles: vue2Vanilla.defaultStyles,
  bootstrap3Styles,
  bootstrap4Styles
};

module.exports = library;
//# sourceMappingURL=index.js.map
