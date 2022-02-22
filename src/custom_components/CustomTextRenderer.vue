<template>
  <control-wrapper
    v-bind="controlWrapper"
    :styles="styles"
    :isFocused="isFocused"
    :appliedOptions="appliedOptions"
    v-show="!control.schema.hidden"
  >
    <textarea
      :id="control.id + '-input'"
      :name="control.path"
      :class="styles.control.textarea"
      :value="control.data"
      :disabled="!control.enabled || control.schema.readOnly"
      :autofocus="appliedOptions.focus"
      :placeholder="appliedOptions.placeholder"
      @change="onChange"
      @focus="isFocused = true"
      @blur="isFocused = false"
      style="border: red 1px solid;"
    />
  </control-wrapper>
</template>

<script lang="ts">
import {
  rankWith,
  isMultiLineControl,
  and,
  schemaMatches,
  JsonFormsRendererRegistryEntry,
  ControlElement
} from "@jsonforms/core";
import { SilicaControlWrapper as ControlWrapper } from "@/components/controls";
import { defineComponent } from "@vue/composition-api";
import { silicaDefaultControlProps } from "@/utils/silica-shims";
import { RendererProps, useJsonFormsControl } from "@jsonforms/vue2";
import { useVanillaControl } from "@jsonforms/vue2-vanilla";
import { SilicaControlSchema } from "@/types/SilicaControlTypes";

const controlRenderer = defineComponent({
  name: "silica-custom-text-renderer",
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
  tester: rankWith(
    // rank must be higher than whatever it is replacing
    3,
    and(
      schemaMatches(schema => {
        return schema.type === "string";
      }),
      isMultiLineControl,
      schemaMatches(schema => {
        const customSchema = schema as SilicaControlSchema;
        return customSchema.customComponentName === "CustomTextRenderer";
      })
    )
  )
};
</script>
