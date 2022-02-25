import { rendererProps } from "@jsonforms/vue2";
import { ControlElement, Layout } from "@jsonforms/core";
import { SilicaControlSchema } from "@/lib-components/types/SilicaControlTypes";

const defaultControlProps = rendererProps<ControlElement>();

export const silicaDefaultControlProps = {
  ...defaultControlProps,
  schema: {
    ...defaultControlProps.schema,
    type: Object as () => SilicaControlSchema,
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

const defaultLayoutProps = rendererProps<Layout>();

export const silicaDefaultLayoutProps = {
  ...defaultLayoutProps
};
