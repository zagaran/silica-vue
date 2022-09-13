<template>
  <div :class="styles.arrayList.item">
    <div @click="expandClicked" :class="toolbarClasses">
      <div :class="styles.arrayList.itemLabel">{{ staticTitle || label }}</div>
      <button
        @click="moveUpClicked"
        :disabled="!moveUpEnabled"
        :class="styles.arrayList.itemMoveUp"
        v-if="showSortButtons"
        type="button"
      >
        ↑
      </button>
      <button
        @click="moveDownClicked"
        :disabled="!moveDownEnabled"
        :class="styles.arrayList.itemMoveDown"
        v-if="showSortButtons"
        type="button"
      >
        ↓
      </button>
      <button
        @click="deleteClicked"
        :class="styles.arrayList.itemDelete"
        type="button"
        v-if="displayDelete"
        :disabled="!enableDelete"
      >
        X
      </button>
    </div>
    <div :class="contentClasses">
      <slot></slot>
    </div>
  </div>
</template>

<!-- TODO: make this work with typescript -->
<script>
import { defineComponent } from "vue";
import {classes} from "@jsonforms/vue2-vanilla";

const listItem = defineComponent({
  name: "silica-array-list-element",
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
    showSortButtons: {
      required: false,
      type: Boolean,
      default: false
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
    displayDelete: {
      required: false,
      type: Boolean,
      default: true
    },
    enableDelete: {
      required: false,
      type: Boolean,
      default: true
    },
    delete: {
      required: false,
      type: Function,
      default: undefined
    },
    styles: {
      required: true,
      type: Object
    },
    staticTitle: {
      required: false,
      type: String
    },
  },
  data() {
    return {
      expanded: this.initiallyExpanded
    };
  },
  computed: {
    contentClasses() {
      return classes`${this.styles.arrayList.itemContent} ${this.expanded &&
        this.styles.arrayList.itemExpanded}`;
    },
    toolbarClasses() {
      return classes`${this.styles.arrayList.itemToolbar} ${this.expanded &&
        this.styles.arrayList.itemExpanded}`;
    }
  },
  methods: {
    expandClicked() {
      this.expanded = !this.expanded;
    },
    moveUpClicked(event) {
      event.stopPropagation();
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      this.moveUp?.();
    },
    moveDownClicked(event) {
      event.stopPropagation();
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      this.moveDown?.();
    },
    deleteClicked(event) {
      event.stopPropagation();
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      this.delete?.();
    }
  }
});

export default listItem;
</script>
