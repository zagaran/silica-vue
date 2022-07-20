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
      :step="1"
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
  </control-wrapper>
</template>

<script>
import {
  rankWith,
  schemaMatches
} from "@jsonforms/core";
import { useVanillaControl } from "@jsonforms/vue2-vanilla";
import { defineComponent } from "@vue/composition-api";
import { SilicaControlWrapper as ControlWrapper } from "./index";

import { useJsonFormsControl } from "@jsonforms/vue2";
import { silicaDefaultControlProps } from "../utils";
import {useSilicaControl} from "../../composition";
import {schemaTypeContains} from "../utils/schema-utils";

const controlRenderer = defineComponent({
  name: "silica-integer-control-renderer",
  components: {
    ControlWrapper
  },
  props: {
    ...silicaDefaultControlProps
  },
  setup(props) {
    return useSilicaControl(useVanillaControl(useJsonFormsControl(props), target =>
      parseInt(target.value, 10)
    ));
  }
});

export default controlRenderer;

export const entry = {
  renderer: controlRenderer,
  tester: rankWith(
    1,
    schemaMatches(schema => {
      return schemaTypeContains(schema, 'integer')
    })
  )
};
</script>
