import {inject} from "vue";

export const useAjv = () => {
  const jsonforms = inject('jsonforms');

  if (!jsonforms) {
    throw new Error(
      "'jsonforms' couldn't be injected. Are you within JSON Forms?"
    );
  }

  // should always exist
  return jsonforms.core?.ajv;
};