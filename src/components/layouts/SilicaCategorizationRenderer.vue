<template>
  <fieldset v-if="layout.visible" :class="styles.categorization.root">
    <legend v-if="layout.uischema.label" :class="styles.categorization.label">
      {{ layout.uischema.label }}
    </legend>
    <div :class="styles.categorization.selectorContainer">
      <button
        v-for="element in visibleCategories"
        type="button"
        :key="element.label"
        @click="() => setActiveCategory(element)"
        :class="
          styles.categorization.selector +
            ' ' +
            (activeCategory === element.label
              ? styles.categorization.activeCategory
              : styles.categorization.category)
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
  isLayout, isVisible,
  rankWith,
  uiTypeIs
} from "@jsonforms/core";
import { useVanillaLayout } from "@jsonforms/vue2-vanilla";
import { defineComponent } from "vue";
import {useAjv} from "../utils/composition";

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
  watch: {
    visibleCategories(newVal) {
      if (newVal.filter(c => c.label === this.activeCategory).length < 1) {
        this.setActiveCategory(newVal[0])
      }
  }
  },
  computed: {
    visibleCategories() {
      return this.layout.uischema.elements.filter(
        (category) =>
          isVisible(category, this.layout.data, this.layout.path, this.ajv)
      );
    },
  },
  props: {
    ...rendererProps()
  },
  setup(props) {
    const ajv = useAjv();
    return {...useVanillaLayout(useJsonFormsLayout(props)), ajv};
  }
});

export default categorizationRenderer;

export const entry = {
  renderer: categorizationRenderer,
  tester: rankWith(2, and(isLayout, uiTypeIs("Categorization")))
};
</script>
