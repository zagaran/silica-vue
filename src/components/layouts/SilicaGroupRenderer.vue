<template>
  <fieldset v-if="layout.visible" :class="overrideCss.root || styles.group.root">
    <legend v-if="layout.uischema.label" :class="overrideCss.label || styles.group.label">
      {{ layout.uischema.label }}
    </legend>
    <div
      v-for="(element, index) in layout.uischema.elements"
      :key="`${layout.path}-${index}`"
      :class="overrideCss.item || styles.group.item"
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
import {
  rankWith,
  and,
  isLayout,
  uiTypeIs
} from "@jsonforms/core";
import { defineComponent } from "vue";
import {
  DispatchRenderer,
  useJsonFormsLayout
} from "@jsonforms/vue2";
import { silicaDefaultLayoutProps } from "../utils";
import { useVanillaLayout } from "@jsonforms/vue2-vanilla";
import {useSilicaLayout} from "../../composition/useSilicaControl";

const layoutRenderer = defineComponent({
  name: "silica-group-renderer",
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

export default layoutRenderer;

export const entry = {
  renderer: layoutRenderer,
  tester: rankWith(2, and(isLayout, uiTypeIs("Group")))
};
</script>
