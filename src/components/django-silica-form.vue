<template>
  <form
    v-on:submit="handleSubmit"
    :id="id"
    :action="action"
    :method="method"
    v-bind="formAttrs || {}"
  >
    <slot name="pre-body"></slot>
    <django-silica-form-body
      :customRenderers="customRenderers"
      :styles="styles"
      :id="id"
      :ref="id"
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
import DjangoSilicaFormBody from "@/components/django-silica-form-body.vue";
import Cookies from "js-cookie";

export default {
  name: "django-silica-form",
  components: { DjangoSilicaFormBody },
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
    handleSubmit: { type: Function, default: () => {} },
    submitClass: String,
    formAttrs: Object,
    method: String,
    action: String,
    csrfToken: String
  },
  computed: {
    csrfTokenValue() {
      if (this.csrfToken) {
        return this.csrfToken;
      } else {
        return Cookies.get("csrftoken");
      }
    }
  },
  methods: {
    getFormData() {
      return this.$refs[this.id].data;
    }
  }
};
</script>

<style scoped></style>
