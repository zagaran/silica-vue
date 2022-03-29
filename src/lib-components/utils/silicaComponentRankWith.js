import {optionIs, rankWith} from "@jsonforms/core";

export const rankCustomSilicaComponent = (customComponentName, rank=10) => {
    return rankWith(rank, optionIs('customComponentName', customComponentName))
}