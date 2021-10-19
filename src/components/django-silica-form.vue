<template>
  <form @submit="handleSubmit || null" :id="id" v-bind="formAttrs || {}">
    <django-silica-form-lite
      :loaderPrefix="loaderPrefix"
      :customRenderers="customRenderers"
      :styles="styles"
      :ref="id + '-form'"
    />
    <button type="submit" :class="submitClass || null">{{ submitText }}</button>
  </form>
</template>

<script>
import DjangoSilicaFormLite from "./django-silica-form-lite";

export default {
  name: "django-silica-form",
  components: { DjangoSilicaFormLite },
  /* 
    Django loads data to JS by creating a script element with an id; we have to read that data in, hence why we are
    passing id strings rather than raw data
   */
  props: {
    loaderPrefix: { type: String, required: true },
    customRenderers: { type: Array, required: true },
    submitText: { type: String, required: true },
    submitClass: String,
    id: { type: String, required: true },
    styles: { type: Object, required: true },
    handleSubmit: Function,
    formAttrs: Object
  },
  methods: {
    getFormData() {
      return this.$refs[this.id].data;
    }
  }
};
</script>

<style scoped></style>
