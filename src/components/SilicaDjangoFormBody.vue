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
import {JsonForms} from "@jsonforms/vue2";
import {defaultStyles} from "@jsonforms/vue2-vanilla";
import {silicaRenderers} from "./renderers";
import {defineComponent} from "@vue/composition-api";
import * as _ from 'lodash';
import {flattenObj} from "./utils";

export default defineComponent({
  name: "silica-django-form-body",
  components: {JsonForms},
  props: {
    id: {type: String, required: true},
    customRenderers: {type: Array, required: false},
    styles: {type: Object, required: false},
    onChange: {type: Function, required: false},
    // these values should only be used if the component's data, schema, and uischema are not being sourced from the
    // DOM, for example when the component is used in the local bench
    dataProp: {type: Object, required: false, default: null},
    schemaProp: {type: Object, required: false, default: null},
    uischemaProp: {type: Object, required: false, default: null}
  },
  data: function () {
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
  watch: {
    dataProp: {
      handler(newValue, oldValue) {
        if (!_.isEqual(newValue, oldValue)) {
          this.formData = {};
          this.ingestData('formData', newValue);
        }
      }, deep: true
    },
    uischemaProp: {
      handler(newValue, oldValue) {
        if (!_.isEqual(newValue, oldValue)) {
          this.uischema = {};
          this.ingestData('uischema', newValue);
        }
      }, deep: true
    },
    schemaProp: {
      handler(newValue, oldValue) {
        if (!_.isEqual(newValue, oldValue)) {
          this.schema = {};
          this.ingestData('schema', newValue);
        }
      }, deep: true
    },
  },
  mounted() {
    // since data needs to be reactive, we load it to the data object in mounted() instead of writing a computed property
    let formData;
    if (this.dataProp != null) {
      formData = this.dataProp;
    } else {
      formData = JSON.parse(
          document.getElementById(this.id + "-data").textContent
      );
    }
    if (formData) {
      this.ingestData('formData', formData);
    }
    let uiSchema;
    if (this.uischemaProp != null) {
      uiSchema = this.uischemaProp;
    } else {
      uiSchema = JSON.parse(
          document.getElementById(this.id + "-ui-schema").textContent
      );
    }
    if (uiSchema) {
      this.ingestData('uischema', uiSchema);
    }
    let schema;
    if (this.schemaProp != null) {
      schema = this.schemaProp;
    } else {
      schema = JSON.parse(
          document.getElementById(this.id + "-schema").textContent
      );
    }
    if (schema) {
      this.ingestData('schema', schema);
    }
  },
  methods: {
    handleChange(ev) {
      this.ingestData('formData', ev.data);
      if (this.onChange) {
        this.onChange(ev);
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
  },
  computed: {
    formRenderers: function () {
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
