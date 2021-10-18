# Silica Vue

This repository contains code to build the Silica implementation for Vue 2. To build the static library, use
`npm run export-lib`. To see how to build a custom renderer, see `src/components/CustomTextRenderer.vue`. This repo is very much
an in-progress project; to suggest changes or assist, please contact [noah@zagaran.com](mailto:noah@zagaran.com).


## Seed (original)

This seed demonstrates how to use [JSON Forms](https://jsonforms.io) with Vue in order to render a simple form for displaying a task entity.
You can find the [Vue 3 seed on the `main` branch](https://github.com/eclipsesource/jsonforms-vue-seed).

It is based on the `vue create` Hello World project.

`src/App.vue` contains the JSON Forms specific code.

- Execute `npm ci` to install the prerequisites.
- Execute `npm run serve` to start the application.

Browse to http://localhost:8080 to see the application in action.

For more information please see the JSON Forms Vue [documentation](https://jsonforms.io/docs/integrations/vue).
