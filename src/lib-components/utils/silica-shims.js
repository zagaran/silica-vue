import { rendererProps } from "@jsonforms/vue2";

const defaultControlProps = rendererProps();

export const silicaDefaultControlProps = {
  ...defaultControlProps,
  schema: {
    ...defaultControlProps.schema,
    type: Object,
    customComponentName: {
      type: String,
      required: false
    },
    hidden: {
      type: Boolean,
      required: false
    },
    name: {
      required: false,
      type: String
    }
  }
};

const defaultLayoutProps = rendererProps();

export const silicaDefaultLayoutProps = {
  ...defaultLayoutProps
};
