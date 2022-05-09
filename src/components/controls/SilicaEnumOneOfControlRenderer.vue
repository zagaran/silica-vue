<template>
  <control-wrapper
    v-bind="controlWrapper"
    :styles="styles"
    :isFocused="isFocused"
    :appliedOptions="appliedOptions"
    v-show="!control.schema.hidden"
  >
    <fieldset v-if="control.schema.options.radio" :class="styles.control.wrapper">
        <label v-for="optionElement in control.options"         
            :key="optionElement.value" :class="styles.control.label.radio || styles.control.option">
          <input
              :id="control.id + '-input'"
              type="radio"
              :value="optionElement.value"
              :checked="control.data === optionElement.value"
              :class="styles.control.input.radio || styles.control.input"
              :disabled="!control.enabled || control.schema.readOnly"
              :name="control.path"
              :autofocus="appliedOptions.focus"
              @change="onChange"
              @focus="isFocused = true"
              @blur="isFocused = false"
          />
          {{ optionElement.label }}
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

<script>
import {
  rankWith,
  isOneOfEnumControl
} from "@jsonforms/core";
import { SilicaControlWrapper as ControlWrapper } from "./index";
import { defineComponent } from "@vue/composition-api";
import { silicaDefaultControlProps } from "../utils";
import { useJsonFormsOneOfEnumControl } from "@jsonforms/vue2";
import { useVanillaControl } from "@jsonforms/vue2-vanilla";
import {useSilicaControl} from "../../composition/useSilicaControl";

const controlRenderer = defineComponent({
  name: "silica-enum-oneof-control-renderer",
  components: {
    ControlWrapper
  },
  props: {
    ...silicaDefaultControlProps
  },
  setup(props) {
    return useSilicaControl(useVanillaControl(useJsonFormsOneOfEnumControl(props)));
  }
});

export default controlRenderer;

export const entry = {
  renderer: controlRenderer,
  tester: rankWith(2, isOneOfEnumControl)
};
</script>
