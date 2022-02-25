<template>
  <fieldset v-if="control.visible" :class="styles.arrayList.root">
    <legend :class="styles.arrayList.legend">
      <button
        :class="styles.arrayList.addButton"
        @click="addButtonClick"
        type="button"
      >
        +
      </button>
      <label :class="styles.arrayList.label">
        {{ control.label }}
      </label>
    </legend>
    <div
      v-for="(element, index) in control.data"
      :key="`${control.path}-${index}`"
      :class="styles.arrayList.itemWrapper"
    >
      <silica-array-list-element
        :moveUp="moveUp(control.path, index)"
        :moveUpEnabled="index > 0"
        :moveDown="moveDown(control.path, index)"
        :moveDownEnabled="index < control.data.length - 1"
        :delete="removeItems(control.path, [index])"
        :label="childLabelForIndex(index)"
        :styles="styles"
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
    <div v-if="noData" :class="styles.arrayList.noData">
      No data
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
import { silicaDefaultControlProps } from "../utils/silica-shims";

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
  computed: {
    noData() {
      return !this.control.data || this.control.data.length === 0;
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
    }
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
