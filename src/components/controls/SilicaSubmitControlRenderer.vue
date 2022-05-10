<template>
  <control-wrapper
    v-bind="controlWrapper"
    :styles="styles"
    :isFocused="isFocused"
    :appliedOptions="appliedOptions"
    v-show="!control.schema.hidden"
  >
    <input
      type="submit"
      :id="control.id + '-input'"
      :class="styles.control.input.submit || styles.control.input.default || styles.control.input"
      :name="control.path"
      :value="control.data"
      :disabled="!control.enabled || control.schema.readOnly"
    />
  </control-wrapper>
</template>

<script>
import {
  and, isStringControl,
  optionIs,
  rankWith, schemaMatches
} from "@jsonforms/core";
import { useVanillaControl } from "@jsonforms/vue2-vanilla";
import { SilicaControlWrapper as ControlWrapper } from "./index";
import { useJsonFormsControl } from "@jsonforms/vue2";
import { defineComponent } from "@vue/composition-api";
import { silicaDefaultControlProps } from "../utils";
import {useSilicaControl} from "../../composition";

const controlRenderer = defineComponent({
  name: "silica-submit-control-renderer",
  components: {
    ControlWrapper
  },
  props: {
    ...silicaDefaultControlProps
  },
  setup(props) {
    return useSilicaControl(useVanillaControl(useJsonFormsControl(props)));
  },
  inject: {
    handleFieldUpdated: {
      default: () => null
    }
  },
});

export default controlRenderer;

export const entry = {
  renderer: controlRenderer,
  tester: rankWith(
      1, 
      and(
          isStringControl,
          optionIs("format", "submit")
      )
  )
};
</script>
