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
      :styles="_styles"
      :id="id"
      :ref="id"
      :onChange="onChange"
      :data.sync="data_"
      :uischema.sync="uischema_"
      :schema.sync="schema_"
      :submit-text="submitText || 'submit'"
      :validator="validator"
      :django-errors.sync="djangoErrors_"
      :custom-elements-content.sync="customElementsContent_"
      @field-modified="handleFieldUpdated"
    />
    <slot name="post-body"></slot>
    <input
      v-if="csrfTokenValue"
      type="hidden"
      name="csrfmiddlewaretoken"
      :value="csrfTokenValue"
    />
    <div :class="_styles.verticalLayout.root" v-if="addSubmitButton">
      <div :class="_styles.verticalLayout.item">
        <input type="submit" :value="submitText || 'Submit'" :class="_styles.control.input.submit || _styles.control.input.default || _styles.control.input || null"/>
      </div>
    </div>
  </form>
</template>

<script>
import SilicaDjangoFormBody from "./SilicaDjangoFormBody.vue";
import Cookies from "js-cookie";
import { defineComponent } from "@vue/composition-api";
import {defaultStyles} from "@jsonforms/vue2-vanilla";
import * as _ from "lodash";
import {flattenObj} from "./utils";
import {updateErrors} from "@jsonforms/core";

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
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onChange: { type: Function, default: () => {} },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    handleSubmit: { type: Function, default: () => {} },
    submitClass: String,
    formAttrs: Object,
    styles: { type: Object, required: false },
    method: String,
    action: String,
    csrfToken: String,
    validator: { type: Object, required: false },
    data: {  required: false, default: null },
    schema: { required: false, default: null },
    uischema: { required: false, default: null },
    djangoErrors: { required: false },
    customElementsContent: {required: false},
    addSubmitButton: { type: Boolean, required: false, default: true },
  },
  data () {
    return {
      data_: {},
      schema_: {},
      uischema_: {},
      djangoErrors_: {}, 
      customElementsContent_: {},
    }
  },
  watch: {
    data: {
      handler(newData, oldData) {
        if (!_.isEqual(oldData, newData)) {
          this.data_ = newData;
        }
      }, deep: true
    },
    schema: {
      handler(newSchema, oldSchema) {
        if (!_.isEqual(oldSchema, newSchema)) {
          this.schema_ = newSchema;
        }
      }, deep: true
    },
    uischema: {
      handler(newUischema, oldUischema) {
        if (!_.isEqual(oldUischema, newUischema)) {
          this.uischema_ = newUischema;
        }
      }
    },
    djangoErrors: {
      handler(newErrors, oldErrors) {
        if (!_.isEqual(oldErrors, newErrors)) {
          this.djangoErrors_ = newErrors;
        }
      }
    },
  },
  provide() {
    return {
      djangoErrors: this.djangoErrors_,
      handleFieldUpdated: this.handleFieldUpdated,
      customElementsContent: this.customElementsContent_,
    }
  },
  beforeMount() {
    // since data needs to be reactive, we load it to the data object in mounted() instead of writing a computed property
    if (document.getElementById(this.id + "-data") && !!!this.data) {
      this.ingestData('data_', JSON.parse(
          document.getElementById(this.id + "-data").textContent
      ));
    } else {
      this.data_ = this.data;
    }
    if (document.getElementById(this.id + "-ui-schema") && !!!this.uischema) {
      this.ingestData('uischema_', JSON.parse(
          document.getElementById(this.id + "-ui-schema").textContent
      ));
    } else {
      this.uischema_ = this.uischema;
    }
    if (document.getElementById(this.id + "-schema") && !!!this.schema) {
      this.ingestData('schema_', JSON.parse(
          document.getElementById(this.id + "-schema").textContent
      ));
    } else {
      this.schema_ = this.schema;
    }
    if (document.getElementById(this.id + "-errors") && !!!this.djangoErrors) {
      this.djangoErrors_ = JSON.parse(
          document.getElementById(this.id + "-errors").textContent
      );
    } else {
      this.djangoErrors_ = this.djangoErrors;
    }
    if (document.getElementById(this.id + "-custom-elements") && !!!this.customElementsContent) {
      this.customElementsContent_ = JSON.parse(
          document.getElementById(this.id + "-custom-elements").textContent
      );
    } else {
      this.customElementsContent_ = this.customElementsContent;
    }
  },
  computed: {
    csrfTokenValue() {
      if (this.csrfToken) {
        return this.csrfToken;
      } else if (window.csrfToken) {
        return window.csrfToken;
      } else {
        return Cookies.get("csrftoken");
      }
    },
    _styles() {
      return this.styles || window.SilicaVueStyles || defaultStyles
    }
  },
  methods: {
    getFormData() {
      return this.$refs[this.id].formData;
    },
    handleFieldUpdated(path) {
      // if a field has been updated, we can clear the Django-specific error for it
      if (this.djangoErrors_ && this.djangoErrors_.hasOwnProperty(path)) {
        delete this.djangoErrors_[path];
      }
    },
    ingestData(dataKey, objToCopy) {
      // To make sure that data is reactive from the start, we use Vue.set() to dynamically set up the data
      // objects. Because the data can be nested, we use lodash's setWith, which allows us to more easily set nested 
      // values.
      if (!_.isEmpty(objToCopy)) {
        const preppedData = flattenObj(objToCopy);
        for (let key of Object.keys(preppedData)) {
          _.setWith(this[dataKey], key, preppedData[key], (nsValue, key, nsObject) => {
            return this.$set(nsObject, key, nsValue)
          })
        }
      }
    }
  }
});
</script>

<style scoped></style>
