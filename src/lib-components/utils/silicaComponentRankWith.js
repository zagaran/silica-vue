import {optionIs, rankWith} from "@jsonforms/core";

export const rankCustomSilicaComponent = (customComponentName, rank=10) => {
    rankWith(rank, optionIs('customComponentName', customComponentName))
}