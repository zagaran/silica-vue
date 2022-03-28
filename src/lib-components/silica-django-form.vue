<template>
  <form
    v-on:submit="handleSubmit"
    :id="id"
    :action="action"
    :method="method"
    v-bind="formAttrs || {}"
  >
    <slot name="pre-body"></slot>
    <silica-django-form-body
      :customRenderers="customRenderers"
      :styles="styles"
      :id="id"
      :ref="id"
      :onChange="onChange"
      :dataProp="dataProp"
      :uischemaProp="uischemaProp"
      :schemaProp="schemaProp"
    />
    <slot name="post-body"></slot>
    <input
      v-if="csrfTokenValue"
      type="hidden"
      name="csrfmiddlewaretoken"
      :value="csrfTokenValue"
    />
    <button type="submit" :class="submitClass || null">
      {{ submitText || "Submit" }}
    </button>
  </form>
</template>

<script>
import SilicaDjangoFormBody from "./silica-django-form-body.vue";
import Cookies from "js-cookie";
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: "silica-django-form",
  components: { SilicaDjangoFormBody },
  /* 
    Django loads data to JS by creating a script element with an id; we have to read that data in, hence why we are
    passing id strings rather than raw data
   */
  props: {
    id: { type: String, required: true },
    submitText: { type: String, required: false },
    customRenderers: { type: Array, required: false },
    styles: { type: Object, required: false },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onChange: { type: Function, default: () => {} },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    handleSubmit: { type: Function, default: () => {} },
    submitClass: String,
    formAttrs: Object,
    method: String,
    action: String,
    csrfToken: String,
    // these values should only be used if the component's data, schema, and uischema are not being sourced from the
    // DOM, for example when the component is used in the test bench
    dataProp: { type: Object, required: false, default: null },
    schemaProp: { type: Object, required: false, default: null },
    uischemaProp: { type: Object, required: false, default: null }
  },
  computed: {
    csrfTokenValue() {
      if (this.csrfToken) {
        return this.csrfToken;
      } else {
        return Cookies.get("csrftoken");
      }
    },
  },
  methods: {
    getFormData() {
      return this.$refs[this.id].formData;
    }
  }
});
</script>

<style scoped></style>
