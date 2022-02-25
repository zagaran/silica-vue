<template>
  <label v-if="layout.visible" :class="styles.label.root">
    {{ this.layout.uischema.text }}
  </label>
</template>

<script lang="ts">
import {
  JsonFormsRendererRegistryEntry,
  Layout,
  rankWith,
  uiTypeIs
} from "@jsonforms/core";
import { silicaDefaultLayoutProps } from "@/lib-components/utils/silica-shims";
import { defineComponent } from "@vue/composition-api";
import {
  DispatchRenderer,
  RendererProps,
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
  setup(props: RendererProps<Layout>) {
    // reuse layouts bindings for label
    return useVanillaLayout(useJsonFormsLayout(props));
  }
});

export default labelRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: labelRenderer,
  tester: rankWith(1, uiTypeIs("Label"))
};
</script>
