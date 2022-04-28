<template>
  <div id="app">
    <h1>JSON Forms Vue 2</h1>
    <h2>Change Form Type</h2>
    <div class="btn-group mb-2">
      <button 
          v-for="formType in formTypes" 
          @click="() => handleFormTypeChanged(formType)" 
          :class="{'selected': formType.name === selectedFormType.name, 'btn': true}"
      >
        {{ formType.name }}
      </button>
    </div>
    <h2>Change Form Component</h2>
    <div class="btn-group mb-2">
      <button :class="{'selected': showSilicaForm, 'btn': true}" @click="showSilicaForm = true">View Silica Form</button>
      <button :class="{'selected': !showSilicaForm, 'btn': true}" @click="showSilicaForm = false">View JSONForms Form</button>
    </div>
    <div class="row mt-2">
      <div class="col-xs-6 well">
        <div v-show="showSilicaForm" class="myform">
          <h2>Django-Silica Form</h2>
          <silica-django-form
              id="test-form"
              :dataProp="formData"
              :schemaProp="schema"
              :uischemaProp="uischema"
              :onChange="onChange"
              :styles="styles"
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
      <div class="col-xs-6">
        <div class="row">
          <div class="col-xs-12">
            <div class="card">
              <div class="card-header">
                <p class="card-title">
                  Schema
                </p>
              </div>
              <div class="card-body">
                <p class="card-text">
                  {{ schema }}
                </p>
              </div>
            </div>
          </div>
                    <div class="col-xs-12">
            <div class="card">
              <div class="card-header">
                <p class="card-title">
                  UI Schema
                </p>
              </div>
              <div class="card-body">
                <p class="card-text">
                  {{ uischema }}
                </p>
              </div>
            </div>
          </div>
                    <div class="col-xs-12">
            <div class="card">
              <div class="card-header">
                <p class="card-title">
                  Form Data
                </p>
              </div>
              <div class="card-body">
                <p class="card-text">
                  {{ formData }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import { JsonForms } from "@jsonforms/vue2";
import {bootstrap4Styles, SilicaDjangoForm, silicaRenderers} from "./export";
import "@jsonforms/vue2-vanilla/vanilla.css";
import "./styles/bootstrap.css";
import {formTypes} from "../docs/.vuepress/example-forms";

const styles = bootstrap4Styles;

const renderers = [
    ...silicaRenderers
];

const schema = {
  type: "object",
  properties: {
    name: { type: "string", 
    },
    checkBoolean: {
      type: "boolean",
    },
    selectBoolean: {
      type: "string",
      oneOf: [
        { const: "true", title: "Yes" },
        { const: "false", title: "No" }
      ],
      options: { radio: true }
    },
    numberInput: { type: "integer" },
    sentDate: { type: "string", format: "date" },
    userInfos: {
      type: "array",
      items: {
        type: "object",
        properties: {
          verifiedEmail: { type: "string" },
          pk: { type: "integer", hidden: true }
        }
      }
    },
    testInput: {type: "integer"}
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
      scope: "#/properties/checkBoolean",
      label: "checkBoolean"
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
    { type: "Control", scope: "#/properties/userInfos", label: "User Info Array", options: {staticTitle: "Test", noDataMsg: "Sorry, nothing here!", addText: "Add User Info", enableAddButton: false} },
    { type: "Control", scope: "#/properties/testInput" },
  ]
};

export default defineComponent({
  name: "DevServe",
  components: {
    JsonForms, 
    SilicaDjangoForm,
  },
  data() {
    return {
      // freeze renderers for performance gains
      renderers: Object.freeze(renderers),
      showSilicaForm: true,
      formData: {
        selectBoolean: 'false'
      },
      schema,
      uischema,
      styles,
      formTypes,
      selectedFormType: formTypes[0]
    };
  },
  methods: {
    onChange(event) {
      this.formData = event.data;
    },
    handleFormTypeChanged(formType) {
      this.selectedFormType = formType;
      this.formData = formType.data;
      this.schema = formType.schema;
      this.uischema = formType.uischema;
    }
  },
  provide: {
    styles
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

button.selected {
  background-color: green;
}

.well {
  border: lightgray 1px solid;
  padding: 10px;
  border-radius: 5px;
}

</style>
