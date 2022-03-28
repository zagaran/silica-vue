<template>
  <json-forms
    :data="formData"
    :renderers="formRenderers"
    :schema="schema"
    :uischema="uischema"
    @change="handleChange"
  />
</template>

<script>
import { JsonForms } from "@jsonforms/vue2";
import { defaultStyles } from "@jsonforms/vue2-vanilla";
import { silicaRenderers } from "./renderers";
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: "silica-django-form-body",
  components: { JsonForms },
  props: {
    id: { type: String, required: true },
    customRenderers: { type: Array, required: false },
    styles: { type: Object, required: false },
    onChange: { type: Function, required: false },
    // these values should only be used if the component's data, schema, and uischema are not being sourced from the
    // DOM, for example when the component is used in the test bench
    dataProp: { type: Object, required: false, default: null },
    schemaProp: { type: Object, required: false, default: null },
    uischemaProp: { type: Object, required: false, default: null }
  },
  data: function() {
    return {
      formData: {},
      schema: {},
      uischema: {}
    };
  },
  provide() {
    return {
      styles: this.styles || window.SilicaVueStyles || defaultStyles
    };
  },
  mounted() {
    // since data needs to be reactive, we load it to the data object in mounted() instead of writing a computed property
    if (this.dataProp != null) {
      this.formData = this.dataProp;
    } else {
      this.formData = JSON.parse(
        document.getElementById(this.id + "-data").textContent
      );
    }
    if (this.uischemaProp != null) {
      this.uischema = this.uischemaProp;
    } else {
      this.uischema = JSON.parse(
        document.getElementById(this.id + "-ui-schema").textContent
      );
    }
    if (this.schemaProp != null) {
      this.schema = this.schemaProp;
    } else {
      this.schema = JSON.parse(
        document.getElementById(this.id + "-schema").textContent
      );
    }
  },
  methods: {
    handleChange(ev) {
      this.formData = ev.data;
      if (this.onChange) {
        this.onChange(ev);
      }
    }
  },
  computed: {
    formRenderers: function() {
      let renderers = [...silicaRenderers];
      let customRenderers = this.customRenderers || window.SilicaCustomRenderers || [];
      if (customRenderers) {
        renderers = [...renderers, ...customRenderers];
      }
      return Object.freeze(renderers);
    }
  }
});
</script>

<style scoped></style>
