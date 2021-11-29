<template>
  <control-wrapper
    v-bind="controlWrapper"
    :styles="styles"
    :isFocused="isFocused"
    :appliedOptions="appliedOptions"
    v-show="!control.schema.hidden"
  >
    <input
      type="number"
      :step="1"
      :id="control.id + '-input'"
      :name="control.path"
      :class="styles.control.input"
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
  JsonFormsRendererRegistryEntry,
  rankWith,
  schemaMatches
} from "@jsonforms/core";
import { useVanillaControl } from "@jsonforms/vue2-vanilla";
import { defineComponent } from "@vue/composition-api";
import { SilicaControlWrapper as ControlWrapper } from "@/components/controls/index";

import { RendererProps, useJsonFormsControl } from "@jsonforms/vue2";
import { silicaDefaultControlProps } from "@/utils/silica-shims";

const controlRenderer = defineComponent({
  name: "silica-integer-control-renderer",
  components: {
    ControlWrapper
  },
  props: {
    ...silicaDefaultControlProps
  },
  setup(props: RendererProps<ControlElement>) {
    return useVanillaControl(useJsonFormsControl(props), target =>
      parseInt(target.value, 10)
    );
  }
});

export default controlRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: controlRenderer,
  tester: rankWith(
    1,
    schemaMatches(schema => {
      return schema.type === "integer";
    })
  )
};
</script>
