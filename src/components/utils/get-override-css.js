export function getOverrideCss(ref) {
    const elem = ref.value;
    if (elem.uischema && elem.uischema.options && elem.uischema.options.overrideCss) {
        return elem.uischema.options.overrideCss
    }
    return false
}

export function getWrapperOverrideCss(ref) {
    const elem = ref.value;
    if (elem.uischema && elem.uischema.options && elem.uischema.options.wrapperOverrideCss) {
        return elem.uischema.options.wrapperOverrideCss
    }
    return false
}