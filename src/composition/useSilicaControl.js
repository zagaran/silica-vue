import {inject} from "@vue/composition-api";
import {getOverrideCss, getWrapperOverrideCss} from "../components/utils/get-override-css";

export function useSilicaControl(props) {
    // this hook should only be used to wrap useVanillaControl
    const {control} = props
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
    console.log(getWrapperOverrideCss(control))
    return {overrideCss: getOverrideCss(control), wrapperOverrideCss: getWrapperOverrideCss(control), ...props};
}

export function useSilicaLayout(props) {
    const {layout} = props
    return {overrideCss: getOverrideCss(layout), ...props}
}

export function useSilicaArrayControl(props) {
    const {control: arrayControl} = props
    return {overrideCss: getOverrideCss(arrayControl), ...props}
}