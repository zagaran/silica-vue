import {optionIs, rankWith} from "@jsonforms/core";

/**
 * Utility function to be used in the definition of entries for custom Silica renderers.
 * @param {string} customComponentName - the name of the component as it will be spelled on the SilicaForm
 * @param {number} rank - the numeric value to associate with the component. Defaults to 10.
 * 
 * 
 * @return {Function} ranker - a ranking function which ranks any component with uischema['options']['customComponentName'] === {customComponentName} with the value {rank}
 */
export const customSilicaRendererTester = (customComponentName, rank=10) => {
    return rankWith(rank, optionIs('customComponentName', customComponentName))
}