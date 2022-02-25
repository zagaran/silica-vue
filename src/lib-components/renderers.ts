import { silicaArrayRenderers } from "@/lib-components/array";
import { silicaLayoutRenderers } from "@/lib-components/layouts";
import { silicaControlRenderers } from "@/lib-components/controls";
import { silicaLabelRenderers } from "@/lib-components/label";

export const silicaRenderers = [
  ...silicaArrayRenderers,
  ...silicaLayoutRenderers,
  ...silicaControlRenderers,
  ...silicaLabelRenderers
];
