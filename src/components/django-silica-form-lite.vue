<template>
  <json-forms
    :ref="id + '-form-body'"
    :data="data"
    :renderers="formRenderers"
    :schema="schema"
    :uischema="uischema"
    @change="handleChange"
  />
</template>

<script>
import { JsonForms } from "@jsonforms/vue2";
import { vanillaRenderers } from "@jsonforms/vue2-vanilla";
import { entry as CategorizationRenderer } from "@/components/layout/Categorization.vue";
import { entry as CategoryRenderer } from "@/components/layout/Category.vue";

export default {
  name: "django-silica-form-lite",
  components: { JsonForms },
  props: {
    loaderPrefix: { type: String, required: true },
    styles: { type: Object, required: true },
    id: { type: String, required: true },
    customRenderers: { type: Array, required: false },
    onChange: { type: Function, required: false }
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
      styles: this.styles
    };
  },
  mounted() {
    // since data needs to be reactive, we load it to the data object in mounted() instead of writing a computed property
    this.data = JSON.parse(
      document.getElementById(this.loaderPrefix + "-data").textContent
    );
    this.uischema = JSON.parse(
      document.getElementById(this.loaderPrefix + "-ui-schema").textContent
    );
    this.schema = JSON.parse(
      document.getElementById(this.loaderPrefix + "-schema").textContent
    );
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
      return Object.freeze(
        [...vanillaRenderers, CategorizationRenderer, CategoryRenderer].concat(
          this.customRenderers
        )
      );
    }
  }
};
</script>

<style scoped></style>
