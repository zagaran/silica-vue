<template>
  <control-wrapper
    v-bind="controlWrapper"
    :styles="styles"
    :isFocused="isFocused"
    :appliedOptions="appliedOptions"
    v-show="!control.schema.hidden"
  >
    <input
      type="checkbox"
      :name="control.path"
      :class="styles.control.input"
      :id="control.id + '-input'"
      :checked="!!control.data"
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
import { defineComponent } from "@vue/composition-api";
import { SilicaControlWrapper as ControlWrapper } from "@/components/controls/index";
import { RendererProps, useJsonFormsControl } from "@jsonforms/vue2";
import { useVanillaControl } from "@jsonforms/vue2-vanilla";
import { silicaDefaultControlProps } from "@/utils/silica-shims";

const controlRenderer = defineComponent({
  name: "silica-boolean-control-renderer",
  components: {
    ControlWrapper
  },
  props: {
    ...silicaDefaultControlProps
  },
  setup(props: RendererProps<ControlElement>) {
    return useVanillaControl(
      useJsonFormsControl(props),
      target => target.checked
    );
  }
});

export default controlRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: controlRenderer,
  tester: rankWith(
    1,
    schemaMatches(schema => {
      return schema.type === "boolean";
    })
  )
};
</script>
