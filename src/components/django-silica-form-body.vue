<template>
  <json-forms
    :data="data"
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
  name: "django-silica-form-body",
  components: { JsonForms },
  props: {
    id: { type: String, required: true },
    customRenderers: { type: Array, required: false },
    styles: { type: Object, required: false },
    onChange: { type: Function, required: false },
    dataP: { type: Object, required: false, default: null },
    schemaP: { type: Object, required: false, default: null },
    uischemaP: { type: Object, required: false, default: null }
  },
  data: function() {
    return {
      data: {},
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
    if (this.dataP != null) {
      this.data = this.dataP;
    } else {
      this.data = JSON.parse(
        document.getElementById(this.id + "-data").textContent
      );
    }
    if (this.uischemaP != null) {
      this.uischema = this.uischemaP;
    } else {
      this.uischema = JSON.parse(
        document.getElementById(this.id + "-ui-schema").textContent
      );
    }
    if (this.schemaP != null) {
      this.schema = this.schemaP;
    } else {
      this.schema = JSON.parse(
        document.getElementById(this.id + "-schema").textContent
      );
    }
  },
  methods: {
    handleChange(ev) {
      this.data = ev.data;
      if (this.onChange) {
        this.onChange(ev);
      }
    }
  },
  computed: {
    formRenderers: function() {
      let renderers = [...silicaRenderers];
      if (this.customRenderers) {
        renderers = [...renderers, ...this.customRenderers];
      }
      if (window.SilicaVueCustomRenderers) {
        renderers = [...renderers, ...window.SilicaVueCustomRenderers];
      }
      return Object.freeze(renderers);
    }
  }
});
</script>

<style scoped></style>
