<template>
  <json-forms
      :data="data"
      :renderers="formRenderers"
      :schema="schema"
      :uischema="uischema"
      :ajv="_validator"
      @change="onChange"
  />
</template>

<script>
import {JsonForms} from "@jsonforms/vue2";
import {defaultStyles} from "@jsonforms/vue2-vanilla";
import {silicaRenderers} from "./renderers";
import {defineComponent} from "@vue/composition-api";
import {createAjv} from "@jsonforms/core";
import ajvErrors from "ajv-errors";

const ajv = ajvErrors(createAjv({useDefaults: true}));

export default defineComponent({
  name: "silica-django-form-body",
  components: {JsonForms},
  props: {
    id: {type: String, required: true},
    customRenderers: {type: Array, required: false},
    styles: {type: Object, required: false},
    onChange: {type: Function, required: false},
    validator: {type: Object, required: false},
    data: {type: Object, required: true},
    schema: {type: Object, required: true},
    uischema: {type: Object, required: true},
    djangoErrors: {required: false},
  },
  provide() {
    return {
      styles: this.styles || window.SilicaVueStyles || defaultStyles,
      djangoErrors: this.djangoErrors || [],
    };
  },
  computed: {
    formRenderers: function () {
      let renderers = [...silicaRenderers];
      let customRenderers = this.customRenderers || window.SilicaCustomRenderers || [];
      if (customRenderers) {
        renderers = [...renderers, ...customRenderers];
      }
      return Object.freeze(renderers);
    },
    _validator: function() {
      return this.validator || window.SilicaValidator || ajv;
    }
  }
});
</script>

<style scoped></style>
