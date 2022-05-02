import {defineConfig} from 'vite'
import {createVuePlugin} from "vite-plugin-vue2";
import AutoImport from 'unplugin-auto-import/vite'
import {resolve} from "path";

// https://vitejs.dev/config/

const commonConfig = {
    plugins: [
        createVuePlugin(),
        AutoImport({
            imports: [
                '@vue/composition-api'
            ]
        }),
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
                '@vue/composition-api',
            ],
            output: {
                // Provide global variables to use in the UMD build
                // for externalized deps
                globals: {
                    vue: 'Vue',
                    '@vue/composition-api': 'VueCompositionAPI',
                }
            },
        },
    }
}

export default defineConfig(({command}) => {
    if (command === 'serve') {
        return {
            ...commonConfig,
        }
    }
    else {
        return {
            ...commonConfig
        }
    }
})
