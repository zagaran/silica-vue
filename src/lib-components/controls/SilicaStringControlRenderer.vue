<template>
  <control-wrapper
    v-bind="controlWrapper"
    :styles="styles"
    :isFocused="isFocused"
    :appliedOptions="appliedOptions"
    v-show="!control.schema.hidden"
  >
    <input
      :id="control.id + '-input'"
      :class="styles.control.input.default || styles.control.input"
      :name="control.path"
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

<script lang="ts">
import {
  ControlElement,
  isStringControl,
  JsonFormsRendererRegistryEntry,
  rankWith
} from "@jsonforms/core";
import { ControlWrapper, useVanillaControl } from "@jsonforms/vue2-vanilla";
import { RendererProps, useJsonFormsControl } from "@jsonforms/vue2";
import { defineComponent } from "@vue/composition-api";
import { silicaDefaultControlProps } from "@/lib-components/utils/silica-shims";

const controlRenderer = defineComponent({
  name: "silica-string-control-renderer",
  components: {
    ControlWrapper
  },
  props: {
    ...silicaDefaultControlProps
  },
  setup(props: RendererProps<ControlElement>) {
    return useVanillaControl(useJsonFormsControl(props));
  }
});

export default controlRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: controlRenderer,
  tester: rankWith(1, isStringControl)
};
</script>
