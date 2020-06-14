const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
const isProduction = process.env.NODE_ENV === 'production';
const autoprefixer = require('autoprefixer')
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ?
        './' : '/',
    productionSourceMap: false,
    // lintOnSave: false,
    devServer: {
        proxy: {
            '/Sev': {
                target: 'http://api.youledui.com',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/Sev': '/'
                }
            },
            '/up': {
                target: 'http://files.youledui.com',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/up': '/'
                }
            },
        }
    },
    configureWebpack: config => {
        if (isProduction) {
            config.plugins.push(new CompressionWebpackPlugin({
                algorithm: 'gzip',
                test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                threshold: 10240,
                minRatio: 0.8
            }))
        }
        config.externals = {
            "BMap": "BMap"
        }
    },
    css: {
        loaderOptions: {
            postcss: {
                plugins: [autoprefixer({
                    overrideBrowserslist: ['ie >= 8', 'Firefox >= 20', 'Safari >= 5', 'Android >= 4', 'Ios >= 6', 'last 4 version'],
                    remove: true
                })],
                sourceMap: true
            }
        }
    },
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [
                path.resolve(__dirname, './src/assets/less/common.less')
            ]
        }
    }
}