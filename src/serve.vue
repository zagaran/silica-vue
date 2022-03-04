<template>
  <div id="app">
    <h1>JSON Forms Vue 2</h1>
    <button @click="showSilicaForm = !showSilicaForm">Switch</button>
    <div v-show="showSilicaForm" class="myform">
      <h2>Django-Silica Form</h2>
      <django-silica-form
        id="test-form"
        :dataP="formData"
        :schemaP="schema"
        :uischemaP="uischema"
        :onChange="onChange"
      />
    </div>
    <div v-show="!showSilicaForm" class="myform">
      <h2>JSONForms.io Form</h2>
      <json-forms
        :data="formData"
        :renderers="renderers"
        :schema="schema"
        :uischema="uischema"
        @change="onChange"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import { JsonForms } from "@jsonforms/vue2";
import { defaultStyles, mergeStyles } from "@jsonforms/vue2-vanilla";
import { DjangoSilicaForm, silicaRenderers } from "./export";
import "@jsonforms/vue2-vanilla/vanilla.css";

// mergeStyles combines all classes from both styles definitions
const styles = mergeStyles(defaultStyles, {
  categorization: {
    label: "categorization-label",
    root: "categorization-root",
    item: "categorization-item",
    selector: "btn",
    activeCategory: "btn btn-red"
  },
  category: {
    label: "category-label",
    root: "category-root",
    item: "category-item"
  }
})

const renderers = [
    ...silicaRenderers
];

const schema = {
  type: "object",
  properties: {
    name: { type: "string", 
      // customComponentName: "CustomTextRenderer" 
    },
    // eslint-disable-next-line @typescript-eslint/camelcase
    selectBoolean: {
      type: "string",
      oneOf: [
        { const: "true", title: "Yes" },
        { const: "false", title: "No" }
      ],
      options: { radio: true }
    },
    // eslint-disable-next-line @typescript-eslint/camelcase
    numberInput: { type: "integer" },
    // eslint-disable-next-line @typescript-eslint/camelcase
    sentDate: { type: "string", format: "date" },
    // eslint-disable-next-line @typescript-eslint/camelcase
    userInfos: {
      type: "array",
      items: {
        type: "object",
        // eslint-disable-next-line @typescript-eslint/camelcase
        properties: {
          verifiedEmail: { type: "string" },
          pk: { type: "integer", hidden: true }
        }
      }
    }
  }
};

const uischema = {
  elements: [
    {
      type: "Control",
      scope: "#/properties/name",
      label: "Name",
      options: { multi: true },
    },
    {
      type: "Control",
      scope: "#/properties/selectBoolean",
      label: "selectBoolean"
    },
    {
      type: "Control",
      scope: "#/properties/numberInput",
      label: "numberInput",
      rule: {
        effect: "SHOW",
        condition: {
          scope: "#",
          // eslint-disable-next-line @typescript-eslint/camelcase
          schema: {
            allOf: [
              {
                type: "object",
                properties: { selectBoolean: { const: "true" } }
              }
            ]
          }
        }
      }
    },
    {
      type: "Control",
      scope: "#/properties/sentDate",
      label: "Sent Date"
    },
    { type: "Control", scope: "#/properties/userInfos" }
  ]
};

export default defineComponent({
  name: "DevServe",
  components: {
    JsonForms, 
    DjangoSilicaForm,
  },
  data() {
    return {
      // freeze renderers for performance gains
      renderers: Object.freeze(renderers),
      showSilicaForm: false,
      formData: {},
      schema,
      uischema,
    };
  },
  methods: {
    onChange(event) {
      this.formData = event.data;
    }
  },
  provide() {
    return {
      styles
    };
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  margin-left: 120px;
  margin-right: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo {
  flex: 0 1 auto;
}

.mylabel {
  color: darkslategrey;
}

.vertical-layout {
  margin-left: 10px;
  margin-right: 10px;
}

.myform {
  width: 640px;
  margin: 0 auto;
}

.text-area {
  min-height: 80px;
}

.control > .wrapper > input[type="checkbox"] {
  flex: 0;
}
</style>
