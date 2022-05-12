export { default as SilicaControlWrapper } from "./SilicaControlWrapper.vue";
export { default as SilicaStringControlRenderer } from "./SilicaStringControlRenderer.vue";
export { default as SilicaMultiStringControlRenderer } from "./SilicaMultiStringControlRenderer.vue";
export { default as SilicaNumberControlRenderer } from "./SilicaNumberControlRenderer.vue";
export { default as SilicaIntegerControlRenderer } from "./SilicaIntegerControlRenderer.vue";
export { default as SilicaEnumControlRenderer } from "./SilicaEnumControlRenderer.vue";
export { default as SilicaOneOfEnumControlRenderer } from "./SilicaEnumOneOfControlRenderer.vue";
export { default as SilicaDateControlRenderer } from "./SilicaDateControlRenderer.vue";
export { default as SilicaDateTimeControlRenderer } from "./SilicaDateTimeControlRenderer.vue";
export { default as SilicaTimeControlRenderer } from "./SilicaTimeControlRenderer.vue";
export { default as SilicaBooleanControlRenderer } from "./SilicaBooleanControlRenderer.vue";
export { default as SilicaHTMLContentRenderer } from "./SilicaHTMLContentRenderer.vue";

import { entry as silicaStringControlRendererEntry } from "./SilicaStringControlRenderer.vue";
import { entry as silicaMultiStringControlRendererEntry } from "./SilicaMultiStringControlRenderer.vue";
import { entry as silicaNumberControlRendererEntry } from "./SilicaNumberControlRenderer.vue";
import { entry as silicaIntegerControlRendererEntry } from "./SilicaIntegerControlRenderer.vue";
import { entry as silicaEnumControlRendererEntry } from "./SilicaEnumControlRenderer.vue";
import { entry as SilicaOneOfEnumControlRendererEntry } from "./SilicaEnumOneOfControlRenderer.vue";
import { entry as silicaDateControlRendererEntry } from "./SilicaDateControlRenderer.vue";
import { entry as silicaDateTimeControlRendererEntry } from "./SilicaDateTimeControlRenderer.vue";
import { entry as silicaTimeControlRendererEntry } from "./SilicaTimeControlRenderer.vue";
import { entry as silicaBooleanControlRendererEntry } from "./SilicaBooleanControlRenderer.vue";
import { entry as silicaHTMLContentRendererEntry } from "./SilicaHTMLContentRenderer.vue";

export const silicaControlRenderers = [
  silicaStringControlRendererEntry,
  silicaMultiStringControlRendererEntry,
  silicaNumberControlRendererEntry,
  silicaIntegerControlRendererEntry,
  silicaEnumControlRendererEntry,
  SilicaOneOfEnumControlRendererEntry,
  silicaDateControlRendererEntry,
  silicaDateTimeControlRendererEntry,
  silicaTimeControlRendererEntry,
  silicaBooleanControlRendererEntry,
  silicaHTMLContentRendererEntry,
];
