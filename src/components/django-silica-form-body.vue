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
import { defaultStyles, vanillaRenderers } from "@jsonforms/vue2-vanilla";
import { entry as CategorizationRenderer } from "@/components/layout/Categorization.vue";
import { entry as CategoryRenderer } from "@/components/layout/Category.vue";

export default {
  name: "django-silica-form-body",
  components: { JsonForms },
  props: {
    id: { type: String, required: true },
    customRenderers: { type: Array, required: false },
    styles: { type: Object, required: false },
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
      styles: this.styles || window.SilicaVueStyles || defaultStyles
    };
  },
  mounted() {
    // since data needs to be reactive, we load it to the data object in mounted() instead of writing a computed property
    this.data = JSON.parse(
      document.getElementById(this.id + "-data").textContent
    );
    this.uischema = JSON.parse(
      document.getElementById(this.id + "-ui-schema").textContent
    );
    this.schema = JSON.parse(
      document.getElementById(this.id + "-schema").textContent
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
      let renderers = [
        ...vanillaRenderers,
        CategorizationRenderer,
        CategoryRenderer
      ];
      if (this.customRenderers) {
        renderers = renderers.concat(this.customRenderers);
      }
      if (window.SilicaVueCustomRenderers) {
        renderers = renderers.concat(window.SilicaVueCustomRenderers);
      }
      return Object.freeze(renderers);
    }
  }
};
</script>

<style scoped></style>
