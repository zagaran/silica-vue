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
import Vue from "vue";
import * as _ from 'lodash';

export default defineComponent({
  name: "silica-django-form-body",
  components: {JsonForms},
  props: {
    id: {type: String, required: true},
    customRenderers: {type: Array, required: false},
    styles: {type: Object, required: false},
    onChange: {type: Function, required: false},
    // these values should only be used if the component's data, schema, and uischema are not being sourced from the
    // DOM, for example when the component is used in the test bench
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
      // objects. Because the data can be nested, we use lodash's setWith.
      
      // $roots keeps previous parent properties as they will be added as a prefix for each prop.
      // $sep is just a preference if you want to seperate nested paths other than dot.
      const flatten = (obj, roots = [], sep = '.') => Object
          // find props of given object
          .keys(obj)
          // return an object by iterating props
          .reduce((memo, prop) => Object.assign(
              // create a new object
              {},
              // include previously returned object
              memo,
              Object.prototype.toString.call(obj[prop]) === '[object Object]'
                  // keep working if value is an object
                  ? flatten(obj[prop], roots.concat([prop]), sep)
                  // include current prop and value and prefix prop with the roots
                  : {[roots.concat([prop]).join(sep)]: obj[prop]}
          ), {})
      const preppedData = flatten(objToCopy);
      for (let key of Object.keys(preppedData)) {
        _.setWith(this[dataKey], key, preppedData[key], function (nsValue, key, nsObject) {
          return Vue.set(nsObject, key, nsValue)
        })
      
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
