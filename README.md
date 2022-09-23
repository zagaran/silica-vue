# Silica Vue

This repository contains the Vue 2 implementation of [Django-Silica](https://www.github.com/zagaran/django-silica). 
To see how to build a custom renderer, see the [sample project](https://www.github.com/sample-django-silica-app). This repo is very much
an in-progress project; to suggest changes or assist, please contact [noah@zagaran.com](mailto:noah@zagaran.com).


## Import via CDN (UNPKG)
The easiest way to import `silica-vue` over CDN is to use UNPKG. To do so, add the following script tag to any page 
you want to use `silica-vue`:
`<script src="unpkg.com/silica-vue@VERSION/dist/silica-vue.umd.js"></script>`

Note that `silica-vue` only runs natively in browsers which support ES6 or higher. If you need to support legacy browsers
e.g. IE11, you should use any of the many tools available to transpile `silica-vue.es.js` to a supported format. We
recommend [babel](https://www.babeljs.io) and [browserify](https://www.browserify.org).


## Build from source
You may choose to install `silica-vue` as an NPM library and build it yourself before including it in your django static files. This is very simple:
1. Run `npx vite build`
2. Copy `/dist/silica-vue.umd.js` to your project's static files folder
3. Import it as you would any other UMD library

## Documentation
There is a combined documentation repository for all Silica libraries located at [Silica-Docs](https://www.github.com/zagaran/silica-docs).


## TODO
- [ ] Categorization Stepper variant