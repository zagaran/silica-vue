<template>
  <div :class="styles.verticalLayout.root">
    <div :class="styles.verticalLayout.item">
      <input type="submit" :value="submitText || 'Submit'"
             :class="styles.control.input.submit || styles.control.input.default || styles.control.input || null"/>
    </div>
  </div>
</template>

<script>
import {defineComponent} from "vue";

const SilicaSubmitButton = defineComponent({
  name: "SilicaSubmitButton",
  props: ["submitText", "styles"]
})

export default SilicaSubmitButton
</script>

<style scoped>

</style>