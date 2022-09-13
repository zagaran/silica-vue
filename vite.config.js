import {defineConfig} from 'vite'
import {createVuePlugin} from "vite-plugin-vue2";
import {resolve} from "path";

// https://vitejs.dev/config/

export default defineConfig({
    plugins: [
        createVuePlugin(),
    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/export.js'),
            name: 'SilicaVue',
            fileName: (format) => `silica-vue.${format}.js`
        },
        rollupOptions: {
            // make sure to externalize deps that shouldn't be bundled
            // into your library
            external: [
                'vue',
            ],
            output: {
                // Provide global variables to use in the UMD build
                // for externalized deps
                globals: {
                    vue: 'Vue',
                }
            },
        },
    }
})
