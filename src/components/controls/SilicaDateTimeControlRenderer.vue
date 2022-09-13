<template>
  <control-wrapper
    v-bind="controlWrapper"
    :styles="wrapperOverrideCss || styles"
    :isFocused="isFocused"
    :appliedOptions="appliedOptions"
    v-show="control.schema.hidden"
  >
    <input
      type="datetime-local"
      :id="control.id + '-input'"
      :name="control.path"
      :class="overrideCss || styles.control.input.default || styles.control.input"
      :value="dataTime"
      :disabled="!control.enabled || control.schema.readOnly"
      :autofocus="appliedOptions.focus"
      :placeholder="appliedOptions.placeholder"
      @change="onChange"
      @focus="isFocused = true"
      @blur="isFocused = false"
    />
  </control-wrapper>
</template>

<script>
import {
  isDateTimeControl,
  rankWith,
} from "@jsonforms/core";
import { silicaDefaultControlProps } from "../utils";
import { SilicaControlWrapper as ControlWrapper } from "./index";
import { defineComponent } from "vue";
import { useJsonFormsControl } from "@jsonforms/vue2";
import { useVanillaControl } from "@jsonforms/vue2-vanilla";
import {useSilicaControl} from "../../composition";

const toISOString = (inputDateTime) => {
  return inputDateTime === "" ? "" : inputDateTime + ":00.000Z";
};

const controlRenderer = defineComponent({
  name: "datetime-control-renderer",
  components: {
    ControlWrapper
  },
  props: {
    ...silicaDefaultControlProps
  },
  setup(props) {
    return useSilicaControl(useVanillaControl(useJsonFormsControl(props), target =>
      toISOString(target.value)
    ));
  },
  computed: {
    dataTime() {
      return (this.control.data ?? "").substr(0, 16);
    }
  }
});

export default controlRenderer;

export const entry = {
  renderer: controlRenderer,
  tester: rankWith(2, isDateTimeControl)
};
</script>
