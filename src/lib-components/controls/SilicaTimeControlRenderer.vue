<template>
  <control-wrapper
    v-bind="controlWrapper"
    :styles="styles"
    :isFocused="isFocused"
    :appliedOptions="appliedOptions"
    v-show="control.schema.hidden"
  >
    <input
      type="time"
      :id="control.id + '-input'"
      :name="control.path"
      :class="styles.control.input.default || styles.control.input"
      :value="control.data"
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
  isTimeControl,
  rankWith,
} from "@jsonforms/core";
import { SilicaControlWrapper as ControlWrapper } from "@/lib-components/controls/index";
import { defineComponent } from "@vue/composition-api";
import { silicaDefaultControlProps } from "@/lib-components/utils/silica-shims";
import { useJsonFormsControl } from "@jsonforms/vue2";
import { useVanillaControl } from "@jsonforms/vue2-vanilla";

const controlRenderer = defineComponent({
  name: "silica-time-control-renderer",
  components: {
    ControlWrapper
  },
  props: {
    ...silicaDefaultControlProps
  },
  setup(props) {
    return useVanillaControl(useJsonFormsControl(props));
  }
});

export default controlRenderer;

export const entry = {
  renderer: controlRenderer,
  tester: rankWith(2, isTimeControl)
};
</script>
