import { silicaArrayRenderers } from "./array";
import { silicaLayoutRenderers } from "./layouts";
import { silicaControlRenderers } from "./controls";
import { silicaLabelRenderers } from "./label";

export const silicaRenderers = [
  ...silicaArrayRenderers,
  ...silicaLayoutRenderers,
  ...silicaControlRenderers,
  ...silicaLabelRenderers
];
