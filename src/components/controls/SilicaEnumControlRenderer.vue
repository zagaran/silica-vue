<template>
  <control-wrapper
    v-bind="controlWrapper"
    :styles="styles"
    :isFocused="isFocused"
    :appliedOptions="appliedOptions"
    v-show="!control.schema.hidden"
  >
    <select
      :id="control.id + '-select'"
      :class="styles.control.select"
      :value="control.data"
      :disabled="!control.enabled"
      :autofocus="appliedOptions.focus"
      @change="onChange"
      @focus="isFocused = true"
      @blur="isFocused = false"
    >
      <option value="" key="empty" :name="control.uischema.name" :class="styles.control.option"/>
      <option
        v-for="optionElement in control.options"
        :key="optionElement.value"
        :value="optionElement.value"
        :label="optionElement.label"
        :class="styles.control.option"
        :name="control.uischema.name"
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
  isEnumControl
} from '@jsonforms/core';
import { SilicaControlWrapper as ControlWrapper } from "@/components/controls/index";
import {defineComponent} from "@vue/composition-api";
import {RendererProps, useJsonFormsEnumControl} from "@jsonforms/vue2";
import {useVanillaControl} from "@jsonforms/vue2-vanilla";
import {silicaDefaultControlProps} from "@/utils/silica-shims";

const controlRenderer = defineComponent({
  name: 'silica-enum-control-renderer',
  components: {
    ControlWrapper
  },
  props: {
    ...silicaDefaultControlProps
  },
  setup(props: RendererProps<ControlElement>) {
    return useVanillaControl(useJsonFormsEnumControl(props));
  }
});

export default controlRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: controlRenderer,
  tester: rankWith(2, isEnumControl)
};
</script>
