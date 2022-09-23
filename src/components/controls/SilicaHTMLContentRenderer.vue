<template>
  <silica-control-wrapper
    v-bind="controlWrapper"
    :styles="wrapperOverrideCss || styles"
    :isFocused="isFocused"
    :appliedOptions="appliedOptions"
    v-show="!control.schema.hidden"
  >
    <span 
      v-html="customElementsContent[control.uischema.name]"
  />
  </silica-control-wrapper>
</template>

<script>
import {
  rankWith, uiTypeIs
} from "@jsonforms/core";
import { defineComponent } from "vue";
import { useJsonFormsControl } from "@jsonforms/vue2";
import { silicaDefaultControlProps } from "../utils";
import {useSilicaControl} from "../../composition";
import {useVanillaControl} from "@jsonforms/vue2-vanilla";
import {SilicaControlWrapper} from "./index";

const controlRenderer = defineComponent({
  name: "silica-html-content-renderer",
  components: {
    SilicaControlWrapper
  },
  props: {
    ...silicaDefaultControlProps
  },
  setup(props) {
    return useSilicaControl(useVanillaControl(useJsonFormsControl(props)));
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
