<template>
  <silica-control-wrapper
    v-bind="controlWrapper"
    :styles="wrapperOverrideCss || styles"
    :isFocused="isFocused"
    :appliedOptions="appliedOptions"
    v-show="!control.schema.hidden"
  >
    <input
      type="checkbox"
      :name="control.path"
      :class="overrideCss || styles.control.input.boolean || styles.control.input.default || styles.control.input"
      :id="control.id + '-input'"
      :checked="!!control.data"
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
  rankWith,
  schemaMatches
} from "@jsonforms/core";
import { defineComponent } from "vue";
import { SilicaControlWrapper } from "./index";
import { useJsonFormsControl } from "@jsonforms/vue2";
import { useVanillaControl } from "@jsonforms/vue2-vanilla";
import { silicaDefaultControlProps } from "../utils";
import {useSilicaControl} from "../../composition";
import {schemaTypeContains} from "../utils/schema-utils";

const controlRenderer = defineComponent({
  name: "silica-boolean-control-renderer",
  components: {
    SilicaControlWrapper
  },
  props: {
    ...silicaDefaultControlProps
  },
  setup(props) {
    return useSilicaControl(useVanillaControl(
      useJsonFormsControl(props),
      target => target.checked
    ));
  }
});

export default controlRenderer;

export const entry = {
  renderer: controlRenderer,
  tester: rankWith(
    1,
    schemaMatches(schema => {
      return schemaTypeContains(schema, 'boolean')
    })
  )
};
</script>
