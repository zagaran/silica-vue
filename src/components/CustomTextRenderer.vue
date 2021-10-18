<template>
  <control-wrapper
    v-bind="controlWrapper"
    :styles="styles"
    :isFocused="isFocused"
    :appliedOptions="appliedOptions"
  >
    <p>This is a custom text renderer!</p>
    <input
      :id="control.id + '-input'"
      :class="styles.control.input"
      :value="control.data"
      :disabled="!control.enabled"
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
  isStringControl,
  JsonSchema,
  schemaMatches,
  and
} from "@jsonforms/core";
import { ControlWrapper, useVanillaControl } from "@jsonforms/vue2-vanilla";
import {
  RendererProps,
  rendererProps,
  useJsonFormsControl
} from "@jsonforms/vue2";
import { defineComponent } from "@vue/composition-api";

type CustomSchema = JsonSchema & { customComponentName: string };

const defaultProps = rendererProps<ControlElement>();

const controlRenderer = defineComponent({
  name: "custom-control-renderer",
  components: {
    ControlWrapper
  },
  props: {
    ...defaultProps,
    schema: {
      ...defaultProps.schema,
      type: Object as () => CustomSchema
    }
  },
  setup(props: RendererProps<ControlElement>) {
    return useVanillaControl(useJsonFormsControl(props));
  }
});

export default controlRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: controlRenderer,
  tester: rankWith(
    3,
    and(
      isStringControl,
      schemaMatches(schema => {
        const castSchema = schema as CustomSchema;
        return (
          // eslint-disable-next-line no-prototype-builtins
          castSchema.hasOwnProperty("customComponentName") &&
          castSchema.customComponentName === "CustomTextRenderer"
        );
      })
    )
  )
};
</script>
