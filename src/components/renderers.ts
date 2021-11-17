import { silicaArrayRenderers } from "@/components/array";
import { silicaLayoutRenderers } from "@/components/layouts";
import { silicaControlRenderers } from "@/components/controls";
import { silicaLabelRenderers } from "@/components/label";

export const silicaRenderers = [
  ...silicaArrayRenderers,
  ...silicaLayoutRenderers,
  ...silicaControlRenderers,
  ...silicaLabelRenderers
];
