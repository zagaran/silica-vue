<template>
  <control-wrapper
    v-bind="controlWrapper"
    :styles="wrapperOverrideCss || styles"
    :isFocused="isFocused"
    :appliedOptions="appliedOptions"
    v-show="!control.schema.hidden"
  >
    <input
      type="number"
      :step="step"
      :name="control.path"
      :id="control.id + '-input'"
      :class="overrideCss || styles.control.input.default || styles.control.input"
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
  rankWith,
  schemaMatches
} from "@jsonforms/core";
import { SilicaControlWrapper as ControlWrapper } from "./index";
import { defineComponent } from "vue";
import { silicaDefaultControlProps } from "../utils";
import { useJsonFormsControl } from "@jsonforms/vue2";
import { useVanillaControl } from "@jsonforms/vue2-vanilla";
import {useSilicaControl} from "../../composition";
import {schemaTypeContains} from "../utils/schema-utils";

const controlRenderer = defineComponent({
  name: "silica-number-control-renderer",
  components: {
    ControlWrapper
  },
  props: {
    ...silicaDefaultControlProps
  },
  setup(props) {
    return useSilicaControl(useVanillaControl(useJsonFormsControl(props), target =>
      Number(target.value)
    ));
  },
  computed: {
    step() {
      const options = this.appliedOptions;
      return options.step ?? 0.1;
    }
  }
});

export default controlRenderer;

export const entry = {
  renderer: controlRenderer,
  tester: rankWith(
    1,
    schemaMatches(schema => {
      return schemaTypeContains(schema, 'number')
    })
  )
};
</script>
