export function getOverrideCss(ref) {
    const elem = ref.value;
    if (elem.uischema && elem.uischema.options) {
        return elem.uischema.options.overrideCss
    }
    return false
}

export function getWrapperOverrideCss(ref) {
    const elem = ref.value;
    if (elem.uischema && elem.uischema.options) {
        return elem.uischema.options.wrapperOverrideCss
    }
    return false
}