export { default as SilicaLayoutRenderer } from "./SilicaLayoutRenderer.vue";
export { default as SilicaGroupRenderer } from "./SilicaGroupRenderer.vue";
export { default as SilicaCategoryRenderer } from "./SilicaCategoryRenderer.vue";
export { default as SilicaCategorizationRenderer } from "./SilicaCategorizationRenderer.vue";

import { entry as silicaLayoutRendererEntry } from "./SilicaLayoutRenderer.vue";
import { entry as silicaGroupRendererEntry } from "./SilicaGroupRenderer.vue";
import { entry as silicaCategoryRendererEntry } from "./SilicaCategoryRenderer.vue";
import { entry as silicaCategorizationRendererEntry } from "./SilicaCategorizationRenderer.vue";

export const silicaLayoutRenderers = [
  silicaLayoutRendererEntry,
  silicaGroupRendererEntry,
  silicaCategoryRendererEntry,
  silicaCategorizationRendererEntry
];
