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
      :disabled="!control.enabled || control.schema.readOnly"
      :autofocus="appliedOptions.focus"
      @change="onChange"
      @focus="isFocused = true"
      @blur="isFocused = false"
    >
      <option value="" key="empty" :name="control.path" :class="styles.control.option"/>
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

<script>
import {
  rankWith,
  isEnumControl
} from '@jsonforms/core';
import { SilicaControlWrapper as ControlWrapper } from "./index";
import {defineComponent} from "@vue/composition-api";
import {useJsonFormsEnumControl} from "@jsonforms/vue2";
import {useVanillaControl} from "@jsonforms/vue2-vanilla";
import {silicaDefaultControlProps} from "../utils";

const controlRenderer = defineComponent({
  name: 'silica-enum-control-renderer',
  components: {
    ControlWrapper
  },
  props: {
    ...silicaDefaultControlProps
  },
  setup(props) {
    return useVanillaControl(useJsonFormsEnumControl(props));
  }
});

export default controlRenderer;

export const entry = {
  renderer: controlRenderer,
  tester: rankWith(2, isEnumControl)
};
</script>
