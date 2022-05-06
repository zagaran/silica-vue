<template>
  <fieldset v-if="control.visible" :class="styles.arrayList.root">
    <div :class="styles.arrayList.legend">
      <label :class="styles.arrayList.label">
        {{ control.label }}
      </label>
      <button
        :class="styles.arrayList.addButton"
        @click="addButtonClick"
        type="button"
        v-if="options.enableAddButton"
        :disabled="!canAddItem"
      >
        {{ canAddItem ? options.addText || "+" : options.maxItemText || "Max Item Count Reached" }}
      </button>
    </div>
    <div
      v-for="(element, index) in control.data"
      :key="`${control.path}-${index}`"
      :class="styles.arrayList.itemWrapper"
    >
      <silica-array-list-element
        :show-sort-button="options.showSortButtons"
        :moveUp="moveUp(control.path, index)"
        :moveUpEnabled="index > 0"
        :moveDown="moveDown(control.path, index)"
        :moveDownEnabled="index < control.data.length - 1"
        :display-delete="options.displayDelete"
        :enable-delete="canDeleteItem"
        :delete="removeItems(control.path, [index])"
        :label="childLabelForIndex(index)"
        :styles="styles"
        :static-title="options.staticTitle"
      >
        <dispatch-renderer
          :schema="control.schema"
          :uischema="childUiSchema"
          :path="composePaths(control.path, `${index}`)"
          :enabled="control.enabled"
          :renderers="control.renderers"
          :cells="control.cells"
        />
      </silica-array-list-element>
    </div>
    <div v-if="noData" :class="styles.arrayList.itemContent">
      <div :class="styles.arrayList.noData">
        {{ options.noDataMsg || "No data" }}
      </div>
    </div>
  </fieldset>
</template>

<script>
import {
  composePaths,
  createDefaultValue,
  rankWith,
  schemaTypeIs,
  and,
  schemaMatches,
} from "@jsonforms/core";
import SilicaArrayListElement from "./SilicaArrayListElement.vue";
import { defineComponent } from "@vue/composition-api";
import {
  DispatchRenderer,
  useJsonFormsArrayControl
} from "@jsonforms/vue2";
import { useVanillaArrayControl } from "@jsonforms/vue2-vanilla";
import { silicaDefaultControlProps } from "../utils";

const controlRenderer = defineComponent({
  name: "silica-array-list-renderer",
  components: {
    SilicaArrayListElement,
    DispatchRenderer
  },
  props: {
    ...silicaDefaultControlProps
  },
  setup(props) {
    return useVanillaArrayControl(useJsonFormsArrayControl(props));
  },
  mounted() {
    console.log(this.control.rootSchema.properties[this.control.path].minItems, this.control.data)
  },
  computed: {
    noData() {
      return !this.control.data || this.control.data.length === 0;
    },
    options() {
      return this.control.uischema?.options || {}; 
    },
    canAddItem() {
      if (this.control.rootSchema.properties[this.control.path].hasOwnProperty('maxItems')) {
        return this.control.rootSchema.properties[this.control.path].maxItems > this.control.data.length;
      }
      return true;
    },
    canDeleteItem() {
      if (this.control.rootSchema.properties[this.control.path].hasOwnProperty('minItems')) {
        return this.control.data.length - 1 > this.control.rootSchema.properties[this.control.path].minItems;
      }
      return true;
    }
  },
  methods: {
    composePaths,
    createDefaultValue,
    addButtonClick() {
      this.addItem(
        this.control.path,
        createDefaultValue(this.control.schema)
      )();
    },
  }
});

export default controlRenderer;

export const entry = {
  renderer: controlRenderer,
  tester: rankWith(
    3,
    and(
      schemaTypeIs("array"),
      schemaMatches(schema => {
        return schema.type === "array";
      })
    )
  )
};
</script>
