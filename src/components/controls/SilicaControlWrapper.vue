<template>
  <div v-if="visible" :class="styles.control.root" :id="id">
    <label :for="id + '-input'" :class="styles.control.label">
      {{ computedLabel }}
    </label>
    <div :class="styles.control.wrapper">
      <slot></slot>
    </div>
    <div :class="styles.control.error" v-for="error in djangoErrors[$parent.control.path]" >
      {{ error }}
    </div>
    <div :class="errors ? styles.control.error : styles.control.description">
      {{ errors ? errors : showDescription ? description : null }}
    </div>
  </div>
</template>

<script>
import {isDescriptionHidden, computeLabel, updateErrors} from "@jsonforms/core";
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: "silica-control-wrapper",
  data() {
    return {
      djangoErrors: this.djangoErrors,  
    }
  },
  props: {
    id: {
      required: true,
      type: String
    },
    description: {
      required: false,
      type: String,
      default: undefined
    },
    errors: {
      required: false,
      type: String,
      default: undefined
    },
    label: {
      required: false,
      type: String,
      default: undefined
    },
    appliedOptions: {
      required: false,
      type: Object,
      default: undefined
    },
    visible: {
      required: false,
      type: Boolean,
      default: true
    },
    required: {
      required: false,
      type: Boolean,
      default: false
    },
    isFocused: {
      required: false,
      type: Boolean,
      default: false
    },
    styles: {
      required: true,
      type: Object
    }
  },
  inject: {
    djangoErrors: {
      default: () => {return {}}
    },
    handleFieldUpdated: {
      default: () => function() {}
    }
  },
  computed: {
    showDescription() {
      return !isDescriptionHidden(
        this.visible,
        this.description,
        this.isFocused,
        !!this.appliedOptions?.showUnfocusedDescription
      );
    },
    computedLabel() {
      return computeLabel(
        this.label,
        this.required,
        !!this.appliedOptions?.hideRequiredAsterisk
      );
    }
  }
});
</script>
