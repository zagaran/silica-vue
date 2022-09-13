<template>
  <fieldset v-if="layout.visible" :class="overrideCss.root || styles.category.root">
    <legend v-if="layout.uischema.label" :class="overrideCss.label || styles.category.label">
      {{ layout.uischema.label }}
    </legend>
    <div
      v-for="(element, index) in layout.uischema.elements"
      :key="`${layout.path}-${index}`"
      :class="overrideCss.item || styles.category.item"
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

import { defineComponent } from "vue";
import {
  DispatchRenderer,
  useJsonFormsLayout
} from "@jsonforms/vue2";
import {
  and,
  isLayout,
  rankWith,
  uiTypeIs
} from "@jsonforms/core";
import { useVanillaLayout } from "@jsonforms/vue2-vanilla";
import { silicaDefaultLayoutProps } from "../utils";
import {useSilicaLayout} from "../../composition/useSilicaControl";

const categoryRenderer = defineComponent({
  name: "category-renderer",
  components: {
    DispatchRenderer
  },
  props: {
    ...silicaDefaultLayoutProps
  },
  setup(props) {
    return useSilicaLayout(useVanillaLayout(useJsonFormsLayout(props)));
  }
});

export default categoryRenderer;

export const entry = {
  renderer: categoryRenderer,
  tester: rankWith(2, and(isLayout, uiTypeIs("Category")))
};
</script>
