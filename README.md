# Silica Vue

This repository contains code to build the Silica implementation for Vue 2. To build the static library, use
`npm run export-lib`. To see how to build a custom renderer, see `custom_components/CustomTextRenderer.vue`. This repo is very much
an in-progress project; to suggest changes or assist, please contact [noah@zagaran.com](mailto:noah@zagaran.com).


## Import via CDN (UNPKG)
The easiest way to import `silica-vue` over CDN is to use UNPKG. To do so, add the following script tag to any page 
you want to use `silica-vue`:
`<script src="unpkg.com/silica-vue@VERSION/dist/silica-vue.umd.min.js"></script>`


## Build from source
You may choose to install `silica-vue` as an NPM library and build it yourself before including it in your django static files. This is very simple:
1. Run `npm run export-lib`
2. Copy `/dist/silica-vue.umd.min.js` to your project's static files folder
3. Import it as you would any other UMD library


## Seed (original)

This seed demonstrates how to use [JSON Forms](https://jsonforms.io) with Vue in order to render a simple form for displaying a task entity.
You can find the [Vue 3 seed on the `main` branch](https://github.com/eclipsesource/jsonforms-vue-seed).

It is based on the `vue create` Hello World project.

`src/App.vue` contains the JSON Forms specific code.

- Execute `npm ci` to install the prerequisites.
- Execute `npm run serve` to start the application.

Browse to http://localhost:8080 to see the application in action.

For more information please see the JSON Forms Vue [documentation](https://jsonforms.io/docs/integrations/vue).
