import {inject} from "@vue/composition-api";

export function useSilicaControl(props) {
    // this hook should only be used to wrap useVanillaControl
    const originalOnChange = props.onChange;
    const handler = inject('handleFieldUpdated', null);
    props.onChange = function (ev) {
        // this emission is what we can listen for at the top level of the form
        // to know when a user has modified a field with an error from Django on it
        if (handler) {
            handler(props.control.value.path, ev);
        }
        return originalOnChange(ev);
    };
    
    return props;
}