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
    <h1>test</h1>
    <div
      v-for="(element, index) in control.data"
      :key="`${control.path}-${index}`"
      :class="styles.arrayList.itemWrapper"
    >
      <custom-array-list-element
        :moveUp="moveUp(control.path, index)"
        :moveUpEnabled="index > 0"
        :moveDown="moveDown(control.path, index)"
        :moveDownEnabled="index < control.data.length - 1"
        :delete="removeItems(control.path, [index])"
        :label="childLabelForIndex(index)"
        :styles="styles"
        :default-title="control.uischema.options.defaultTitle"
      >
        <dispatch-renderer
          :schema="control.schema"
          :uischema="childUiSchema"
          :path="composePaths(control.path, `${index}`)"
          :enabled="control.enabled"
          :renderers="control.renderers"
          :cells="control.cells"
        />
      </custom-array-list-element>
    </div>
    <div v-if="noData" :class="styles.arrayList.noData">
      No data
    </div>
  </fieldset>
</template>

<script lang="ts">
import {
  composePaths,
  createDefaultValue,
  JsonFormsRendererRegistryEntry,
  rankWith,
  ControlElement,
  schemaTypeIs,
  and,
  JsonSchema,
  schemaMatches
} from "@jsonforms/core";
import CustomArrayListElement from "./CustomArrayListElement";
import { defineComponent } from "@vue/composition-api";
import {
  DispatchRenderer,
  RendererProps,
  rendererProps,
  useJsonFormsArrayControl
} from "@jsonforms/vue2";
import { useVanillaArrayControl } from "@jsonforms/vue2-vanilla";

type CustomSchema = JsonSchema & { customComponentName: string };

const controlRenderer = defineComponent({
  name: "custom-array-list-renderer",
  components: {
    CustomArrayListElement,
    DispatchRenderer
  },
  props: {
    ...rendererProps<ControlElement>()
  },
  setup(props: RendererProps<ControlElement>) {
    return useVanillaArrayControl(useJsonFormsArrayControl(props));
  },
  computed: {
    noData(): boolean {
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

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: controlRenderer,
  tester: rankWith(
    3,
    and(
      schemaTypeIs("array"),
      schemaMatches(schema => {
        const castSchema = schema as CustomSchema;
        return (
          // eslint-disable-next-line no-prototype-builtins
          castSchema.hasOwnProperty("customComponentName") &&
          castSchema.customComponentName === "CustomArrayRenderer"
        );
      })
    )
  )
};
</script>
