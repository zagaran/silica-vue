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
      :step="step"
      :name="control.path"
      :id="control.id + '-input'"
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

<script lang="ts">
import {
  ControlElement,
  JsonFormsRendererRegistryEntry,
  rankWith,
  schemaMatches
} from "@jsonforms/core";
import { SilicaControlWrapper as ControlWrapper } from "@/components/controls/index";
import { defineComponent } from "@vue/composition-api";
import { silicaDefaultControlProps } from "@/utils/silica-shims";
import { RendererProps, useJsonFormsControl } from "@jsonforms/vue2";
import { useVanillaControl } from "@jsonforms/vue2-vanilla";

const controlRenderer = defineComponent({
  name: "silica-number-control-renderer",
  components: {
    ControlWrapper
  },
  props: {
    ...silicaDefaultControlProps
  },
  setup(props: RendererProps<ControlElement>) {
    return useVanillaControl(useJsonFormsControl(props), target =>
      Number(target.value)
    );
  },
  computed: {
    step(): number {
      const options: any = this.appliedOptions;
      return options.step ?? 0.1;
    }
  }
});

export default controlRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: controlRenderer,
  tester: rankWith(
    1,
    schemaMatches(schema => {
      return schema.type === "number";
    })
  )
};
</script>
