<template>
  <label v-if="layout.visible" :class="styles.label.root">
    {{ this.layout.uischema.text }}
  </label>
</template>

<script>
import {
  rankWith,
  uiTypeIs
} from "@jsonforms/core";
import { silicaDefaultLayoutProps } from "../utils";
import { defineComponent } from "@vue/composition-api";
import {
  DispatchRenderer,
  useJsonFormsLayout
} from "@jsonforms/vue2";
import { useVanillaLayout } from "@jsonforms/vue2-vanilla";

const labelRenderer = defineComponent({
  name: "silica-label-renderer",
  components: {
    DispatchRenderer
  },
  props: {
    ...silicaDefaultLayoutProps
  },
  setup(props) {
    // reuse layouts bindings for label
    return useVanillaLayout(useJsonFormsLayout(props));
  }
});

export default labelRenderer;

export const entry = {
  renderer: labelRenderer,
  tester: rankWith(1, uiTypeIs("Label"))
};
</script>
