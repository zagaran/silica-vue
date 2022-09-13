<template>
  <div v-if="layout.visible" :class="overrideCss.root || layoutClassObject.root">
    <div
      v-for="(element, index) in layout.uischema.elements"
      :key="`${layout.path}-${index}`"
      :class="overrideCss.item || layoutClassObject.item"
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
  </div>
</template>

<script>
import {
  isLayout,
  rankWith
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
  name: "silica-layout-renderer",
  components: {
    DispatchRenderer
  },
  props: {
    ...silicaDefaultLayoutProps
  },
  setup(props) {
    return useSilicaLayout(useVanillaLayout(useJsonFormsLayout(props)));
  },
  computed: {
    layoutClassObject() {
      return this.layout.direction === "row"
        ? this.styles.horizontalLayout
        : this.styles.verticalLayout;
    }
  }
});

export default layoutRenderer;

export const entry = {
  renderer: layoutRenderer,
  tester: rankWith(1, isLayout)
};
</script>
