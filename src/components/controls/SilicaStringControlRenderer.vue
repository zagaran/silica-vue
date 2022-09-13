<template>
  <control-wrapper
    v-bind="controlWrapper"
    :styles="wrapperOverrideCss || styles"
    :isFocused="isFocused"
    :appliedOptions="appliedOptions"
    v-show="!control.schema.hidden"
  >
    <input
      :id="control.id + '-input'"
      :class="overrideCss || styles.control.input.default || styles.control.input"
      :name="control.path"
      :value="control.data"
      :disabled="!control.enabled || control.schema.readOnly"
      :autofocus="appliedOptions.focus"
      :placeholder="appliedOptions.placeholder"
      :maxlength="appliedOptions.maxLength"
      @change="onChange"
      @focus="isFocused = true"
      @blur="isFocused = false"
    />
  </control-wrapper>
</template>

<script>
import {
  isStringControl,
  rankWith
} from "@jsonforms/core";
import { useVanillaControl } from "@jsonforms/vue2-vanilla";
import { SilicaControlWrapper as ControlWrapper } from "./index";
import { useJsonFormsControl } from "@jsonforms/vue2";
import { defineComponent } from "vue";
import { silicaDefaultControlProps } from "../utils";
import {useSilicaControl} from "../../composition";

const controlRenderer = defineComponent({
  name: "silica-string-control-renderer",
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
  tester: rankWith(1, isStringControl)
};
</script>
