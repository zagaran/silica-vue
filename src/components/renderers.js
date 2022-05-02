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

export { silicaArrayRenderers } from "./array";
export { silicaLayoutRenderers } from "./layouts";
export { silicaControlRenderers } from "./controls";
export { silicaLabelRenderers } from "./label";