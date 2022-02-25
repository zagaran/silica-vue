<template>
  <fieldset v-if="layout.visible" :class="styles.category.root">
    <legend v-if="layout.uischema.label" :class="styles.category.label">
      {{ layout.uischema.label }}
    </legend>
    <div
      v-for="(element, index) in layout.uischema.elements"
      :key="`${layout.path}-${index}`"
      :class="styles.category.item"
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

<script>
// TODO: make this work with typescript

import { defineComponent } from "@vue/composition-api";
import {
  DispatchRenderer,
  RendererProps,
  rendererProps,
  useJsonFormsLayout
} from "@jsonforms/vue2";
import {
  and,
  isLayout,
  rankWith,
  uiTypeIs
} from "@jsonforms/core";
import { useVanillaLayout } from "@jsonforms/vue2-vanilla";

const categoryRenderer = defineComponent({
  name: "category-renderer",
  components: {
    DispatchRenderer
  },
  props: {
    ...rendererProps()
  },
  setup(props) {
    return useVanillaLayout(useJsonFormsLayout(props));
  }
});

export default categoryRenderer;

export const entry = {
  renderer: categoryRenderer,
  tester: rankWith(2, and(isLayout, uiTypeIs("Category")))
};
</script>
