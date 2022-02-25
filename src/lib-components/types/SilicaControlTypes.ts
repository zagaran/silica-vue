import { JsonSchema } from "@jsonforms/core";

export type SilicaControlSchema = JsonSchema & {
  customComponentName: string;
  hidden: boolean;
  name: string | undefined;
};
