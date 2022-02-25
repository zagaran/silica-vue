<template>
  <fieldset v-if="layout.visible" :class="styles.categorization.root">
    <legend v-if="layout.uischema.label" :class="styles.categorization.label">
      {{ layout.uischema.label }}
    </legend>
    <div>
      <button
        v-for="element in layout.uischema.elements"
        type="button"
        :key="element.label"
        @click="() => setActiveCategory(element)"
        :class="
          styles.categorization.selector +
            ' ' +
            (activeCategory === element.label
              ? styles.categorization.activeCategory
              : '')
        "
      >
        {{ element.label }}
      </button>
    </div>
    <div
      v-for="(element, index) in layout.uischema.elements"
      :key="`${layout.path}-${index}`"
      :class="styles.categorization.item"
    >
      <dispatch-renderer
        v-show="element.label === activeCategory"
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

import {
  DispatchRenderer,
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
import { defineComponent } from "@vue/composition-api";

const categorizationRenderer = defineComponent({
  name: "categorization-renderer",
  components: {
    DispatchRenderer
  },
  methods: {
    setActiveCategory(category) {
      this.activeCategory = category.label;
    }
  },
  data() {
    return {
      activeCategory: this.uischema.initial
        ? this.uischema.initial
        : this.uischema.elements[0].label
    };
  },
  props: {
    ...rendererProps()
  },
  setup(props) {
    return useVanillaLayout(useJsonFormsLayout(props));
  }
});

export default categorizationRenderer;

export const entry = {
  renderer: categorizationRenderer,
  tester: rankWith(2, and(isLayout, uiTypeIs("Categorization")))
};
</script>
