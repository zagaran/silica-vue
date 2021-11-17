<template>
  <fieldset v-if="layout.visible" :class="styles.group.root">
    <legend v-if="layout.uischema.label" :class="styles.group.label">
      {{ layout.uischema.label }}
    </legend>
    <div
      v-for="(element, index) in layout.uischema.elements"
      :key="`${layout.path}-${index}`"
      :class="styles.group.item"
    >
      <dispatch-renderer
        :schema="layout.schema"
        :uischema="element"
        :path="layout.path"
        :enabled="layout.enabled"
        :renderers="layout.renderers"
        :cells="layout.cells"
      />
    </div>
  </fieldset>
</template>

<script lang="ts">
import {
  JsonFormsRendererRegistryEntry,
  Layout,
  rankWith,
  and,
  isLayout,
  uiTypeIs
} from "@jsonforms/core";
import { defineComponent } from "@vue/composition-api";
import {
  DispatchRenderer,
  RendererProps,
  useJsonFormsLayout
} from "@jsonforms/vue2";
import { silicaDefaultLayoutProps } from "@/utils/silica-shims";
import { useVanillaLayout } from "@jsonforms/vue2-vanilla";

const layoutRenderer = defineComponent({
  name: "silica-group-renderer",
  components: {
    DispatchRenderer
  },
  props: {
    ...silicaDefaultLayoutProps
  },
  setup(props: RendererProps<Layout>) {
    return useVanillaLayout(useJsonFormsLayout(props));
  }
});

export default layoutRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: layoutRenderer,
  tester: rankWith(2, and(isLayout, uiTypeIs("Group")))
};
</script>
