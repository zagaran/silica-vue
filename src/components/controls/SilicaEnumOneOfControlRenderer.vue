<template>
  <control-wrapper
    v-bind="controlWrapper"
    :styles="styles"
    :isFocused="isFocused"
    :appliedOptions="appliedOptions"
    v-show="!control.schema.hidden"
  >
    <fieldset v-if="control.schema.options.radio" :class="styles.control.radioWrapper">
      <label
        v-for="optionElement in control.options"
        :key="optionElement.value"
        :class="styles.control.radioLabel || styles.control.option"
      >
        {{ optionElement.label }}
        <input
          :id="control.id + '-input'"
          type="radio"
          :value="optionElement.value"
          :checked="control.data === optionElement.value"
          :class="styles.control.radioInput"
          :disabled="!control.enabled || control.schema.readOnly"
          :name="control.path"
          :autofocus="appliedOptions.focus"
          @change="onChange"
          @focus="isFocused = true"
          @blur="isFocused = false"
        />
      </label>
    </fieldset>
    <select
      v-else
      :id="control.id + '-input'"
      :class="styles.control.select"
      :value="control.data"
      :disabled="!control.enabled || control.schema.readOnly"
      :autofocus="appliedOptions.focus"
      @change="onChange"
      @focus="isFocused = true"
      @blur="isFocused = false"
    >
      <option
        v-for="optionElement in control.options"
        :key="optionElement.value"
        :value="optionElement.value"
        :label="optionElement.label"
        :class="styles.control.option"
        :name="control.path"
      >
      </option
    ></select>
  </control-wrapper>
</template>

<script lang="ts">
import {
  ControlElement,
  JsonFormsRendererRegistryEntry,
  rankWith,
  isOneOfEnumControl
} from "@jsonforms/core";
import { SilicaControlWrapper as ControlWrapper } from "@/components/controls/index";
import { defineComponent } from "@vue/composition-api";
import { silicaDefaultControlProps } from "@/utils/silica-shims";
import { RendererProps, useJsonFormsOneOfEnumControl } from "@jsonforms/vue2";
import { useVanillaControl } from "@jsonforms/vue2-vanilla";

const controlRenderer = defineComponent({
  name: "silica-enum-oneof-control-renderer",
  components: {
    ControlWrapper
  },
  props: {
    ...silicaDefaultControlProps
  },
  setup(props: RendererProps<ControlElement>) {
    return useVanillaControl(useJsonFormsOneOfEnumControl(props));
  }
});

export default controlRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: controlRenderer,
  tester: rankWith(2, isOneOfEnumControl)
};
</script>
