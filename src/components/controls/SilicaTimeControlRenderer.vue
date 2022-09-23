<template>
  <silica-control-wrapper
    v-bind="controlWrapper"
    :styles="wrapperOverrideCss || styles"
    :isFocused="isFocused"
    :appliedOptions="appliedOptions"
    v-show="control.schema.hidden"
  >
    <input
      type="time"
      :id="control.id + '-input'"
      :name="control.path"
      :class="overrideCss || styles.control.input.default || styles.control.input"
      :value="control.data"
      :disabled="!control.enabled || control.schema.readOnly"
      :autofocus="appliedOptions.focus"
      :placeholder="appliedOptions.placeholder"
      @change="onChange"
      @focus="isFocused = true"
      @blur="isFocused = false"
    />
  </silica-control-wrapper>
</template>

<script>
import {
  isTimeControl,
  rankWith,
} from "@jsonforms/core";
import { SilicaControlWrapper } from "./index";
import { defineComponent } from "vue";
import { silicaDefaultControlProps } from "../utils/silica-shims";
import { useJsonFormsControl } from "@jsonforms/vue2";
import { useVanillaControl } from "@jsonforms/vue2-vanilla";
import {useSilicaControl} from "../../composition";

const controlRenderer = defineComponent({
  name: "silica-time-control-renderer",
  components: {
    SilicaControlWrapper
  },
  props: {
    ...silicaDefaultControlProps
  },
  setup(props) {
    return useSilicaControl(useVanillaControl(useJsonFormsControl(props)));
  }
});

export default controlRenderer;

export const entry = {
  renderer: controlRenderer,
  tester: rankWith(2, isTimeControl)
};
</script>
