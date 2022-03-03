const {defineConfig} = require('@vue/cli-service')
const webpack = require("webpack");
module.exports = defineConfig({
    transpileDependencies: true,
    configureWebpack: {
        resolve: {
            fallback: {
                "fs": false,
                "http": false,
                "https": false,
                "url": false
            }
        },
        plugins: [
            new webpack.ProvidePlugin({
              process: 'process/browser',
            }),
        ]
    }
})
