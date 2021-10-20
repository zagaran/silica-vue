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
import {
  defaultStyles,
  mergeStyles,
  Styles,
  vanillaRenderers
} from "@jsonforms/vue2-vanilla";
import { entry as CustomTextRenderer } from "@/components/controls/CustomTextRenderer.vue";
import { entry as CategorizationRenderer } from "@/components/layout/Categorization.vue";
import { entry as CategoryRenderer } from "@/components/layout/Category.vue";

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
  ...vanillaRenderers,
  CustomTextRenderer,
  CategorizationRenderer,
  CategoryRenderer
  // here you can add custom renderers
];

const schema = {
  properties: {
    name: {
      type: "string",
      minLength: 1,
      description: "The task's name"
    },
    description: {
      title: "Long Description",
      type: "string",
      customComponentName: "CustomTextRenderer"
    },
    done: {
      type: "boolean"
    },
    dueDate: {
      type: "string",
      format: "date",
      description: "The task's due date"
    },
    rating: {
      type: "integer",
      maximum: 5
    },
    recurrence: {
      type: "string",
      enum: ["Never", "Daily", "Weekly", "Monthly"]
    },
    recurrenceInterval: {
      type: "integer",
      description: "Amount of days until recurrence"
    }
  }
};

const uischema = {
  type: "z",
  elements: [
    {
      type: "VerticalLayout",
      elements: [
        {
          type: "Control",
          scope: "#/properties/name"
        },
        {
          type: "Control",
          scope: "#/properties/description",
          options: {
            multi: true
          }
        },
        {
          type: "Control",
          scope: "#/properties/done"
        }
      ]
    },
    {
      type: "VerticalLayout",
      elements: [
        {
          type: "Control",
          scope: "#/properties/dueDate"
        },
        {
          type: "Control",
          scope: "#/properties/rating"
        },
        {
          type: "Control",
          scope: "#/properties/recurrence"
        },
        {
          type: "Control",
          scope: "#/properties/recurrenceInterval"
        }
      ]
    },
    {
      type: "Categorization",
      elements: [
        {
          type: "Category",
          label: "Personal Data",
          elements: [
            {
              type: "Control",
              scope: "#/properties/name"
            },
            {
              type: "Control",
              scope: "#/properties/description"
            }
          ]
        },
        {
          type: "Category",
          label: "Other",
          elements: [
            {
              type: "Control",
              scope: "#/properties/dueDate"
            },
            {
              type: "Control",
              scope: "#/properties/rating"
            }
          ]
        }
      ]
    }
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
        name: "Send email to Adrian",
        description: "Confirm if you have passed the subject\nHereby ...",
        done: true,
        recurrence: "Daily",
        rating: 3
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
