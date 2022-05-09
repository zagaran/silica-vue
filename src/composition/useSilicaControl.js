import onBeforeMount from "@vue/composition-api/dist/vue-composition-api";

export function useSilicaControl(props) {
    // this hook should only be used to wrap useVanillaControl
    const originalOnChange = props.onChange;
    props.onChange = function (ev) {
        // this emission is what we can listen for at the top level of the form
        // to know when a user has modified a field with an error from Django on it
        this.$root.$emit('field:modified', props.control.value.path);
        return originalOnChange(ev);
    };
    
    return props;
}