<template>
  <div :class="styles.arrayList.item">
    <div @click="expandClicked" :class="toolbarClasses">
      <div :class="styles.arrayList.itemLabel">{{ label || defaultTitle }}</div>
      <button
        @click="moveUpClicked"
        :disabled="!moveUpEnabled"
        :class="styles.arrayList.itemMoveUp"
        type="button"
      >
        ↑
      </button>
      <button
        @click="moveDownClicked"
        :disabled="!moveDownEnabled"
        :class="styles.arrayList.itemMoveDown"
        type="button"
      >
        ↓
      </button>
      <button
        @click="deleteClicked"
        :class="styles.arrayList.itemDelete"
        type="button"
      >
        🗙
      </button>
    </div>
    <div :class="contentClasses">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { CompType } from "@jsonforms/vue2-vanilla/lib/config/vue";
import { classes, Styles } from "@jsonforms/vue2-vanilla";

const listItem = defineComponent({
  name: "custom-array-list-element",
  props: {
    initiallyExpanded: {
      required: false,
      type: Boolean,
      default: false
    },
    label: {
      required: false,
      type: String,
      default: ""
    },
    moveUpEnabled: {
      required: false,
      type: Boolean,
      default: true
    },
    moveDownEnabled: {
      required: false,
      type: Boolean,
      default: true
    },
    moveUp: {
      required: false,
      type: Function,
      default: undefined
    },
    moveDown: {
      required: false,
      type: Function,
      default: undefined
    },
    delete: {
      required: false,
      type: Function,
      default: undefined
    },
    styles: {
      required: true,
      type: Object as CompType<Styles, ObjectConstructor>
    },
    defaultTitle: {
      required: false,
      type: String
    }
  },
  data() {
    return {
      expanded: this.initiallyExpanded
    };
  },
  computed: {
    contentClasses(): string {
      return classes`${this.styles.arrayList.itemContent} ${this.expanded &&
        this.styles.arrayList.itemExpanded}`;
    },
    toolbarClasses(): string {
      return classes`${this.styles.arrayList.itemToolbar} ${this.expanded &&
        this.styles.arrayList.itemExpanded}`;
    }
  },
  methods: {
    expandClicked(): void {
      this.expanded = !this.expanded;
    },
    moveUpClicked(event: Event): void {
      event.stopPropagation();
      this.moveUp?.();
    },
    moveDownClicked(event: Event): void {
      event.stopPropagation();
      this.moveDown?.();
    },
    deleteClicked(event: Event): void {
      event.stopPropagation();
      this.delete?.();
    }
  }
});

export default listItem;
</script>
