<template>
  <div id="app">
    <img class="logo" alt="Vue logo" src="./assets/logo.png" />
    <h1>JSON Forms Vue 2</h1>
    <div class="myform">
      <json-forms
        v-bind:data="data"
        v-bind:renderers="renderers"
        v-bind:schema="schema"
        v-bind:uischema="uischema"
        @change="onChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { JsonForms, JsonFormsChangeEvent } from "@jsonforms/vue2";
import { defaultStyles, mergeStyles, Styles } from "@jsonforms/vue2-vanilla";
import { silicaRenderers } from "@/components/renderers";

type CustomStyles = Styles & {
  categorization: {
    label: string;
    root: string;
    item: string;
    selector: string;
    activeCategory?: string;
  };
  category: {
    label: string;
    root: string;
    item: string;
  };
};

// mergeStyles combines all classes from both styles definitions
const myStyles = mergeStyles(defaultStyles, {
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
} as CustomStyles);

const renderers = [
  ...silicaRenderers
  // here you can add custom renderers
];

const schema = {
  type: "object",
  properties: {
    name: { type: "string" },
    // eslint-disable-next-line @typescript-eslint/camelcase
    has_chapter_200: { type: "boolean" },
    // eslint-disable-next-line @typescript-eslint/camelcase
    housing_count: { type: "integer" },
    // eslint-disable-next-line @typescript-eslint/camelcase
    unsent_letter_cutoff_date: { type: "string", format: "date" },
    // eslint-disable-next-line @typescript-eslint/camelcase
    user_infos: {
      type: "array",
      items: {
        type: "object",
        // eslint-disable-next-line @typescript-eslint/camelcase
        properties: { verified_email: { type: "string" } }
      }
    }
  }
};

const uischema = {
  elements: [
    { type: "Control", scope: "#/properties/name", label: "Name", name: "testP_name"},
    {
      type: "Control",
      scope: "#/properties/has_chapter_200",
      label: "Has chapter 200"
    },
    {
      type: "Control",
      scope: "#/properties/housing_count",
      label: "Housing count",
      rule: {
        effect: "SHOW",
        condition: {
          scope: "#",
          // eslint-disable-next-line @typescript-eslint/camelcase
          schema: { allOf: [{type:"object", "properties": {has_chapter_200: {const: true}}}]}
        }
      }
    },
    {
      type: "Control",
      scope: "#/properties/unsent_letter_cutoff_date",
      label: "Unsent letter cutoff date"
    },
    { type: "Control", scope: "#/properties/user_infos" }
  ]
};

export default defineComponent({
  name: "App",
  components: {
    JsonForms
  },
  data() {
    return {
      // freeze renderers for performance gains
      renderers: Object.freeze(renderers),
      data: {
        comments: [
          {
            message: "asdfasdf",
            pk: 123,
          }
        ]
      },
      schema,
      uischema
    };
  },
  methods: {
    onChange(event: JsonFormsChangeEvent) {
      this.data = event.data;
    }
  },
  provide() {
    return {
      styles: myStyles
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
