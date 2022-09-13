<template>
  <span v-html="customElementsContent[control.uischema.name]"></span>
</template>

<script>
import {
  rankWith, uiTypeIs
} from "@jsonforms/core";
import { defineComponent } from "vue";
import { useJsonFormsControl } from "@jsonforms/vue2";
import { silicaDefaultControlProps } from "../utils";

const controlRenderer = defineComponent({
  name: "silica-html-content-renderer",
  props: {
    ...silicaDefaultControlProps
  },
  setup(props) {
    return useJsonFormsControl(props);
  },
  inject: {
    customElementsContent: {
      default: () => {return {}}
    }
  }
});

export default controlRenderer;

export const entry = {
  renderer: controlRenderer,
  tester: rankWith(
    1,
    uiTypeIs("CustomHTMLElement")
  )
};
</script>
