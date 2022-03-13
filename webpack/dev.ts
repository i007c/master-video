// types
import { Configuration } from 'webpack'
import { Configuration as DevConfiguration } from 'webpack-dev-server'

// styles
import { DevStyle } from './config/style'

// path
import { DEV_DIR, resolve } from './config/path'

// plugins
import HtmlWP from 'html-webpack-plugin'

// base configs
import main from './main'

interface Config extends Configuration {
    devServer: DevConfiguration
}

const DevConfig: Config = {
    ...main,
    mode: 'development',
    entry: resolve(DEV_DIR, 'App.tsx'),
    module: {
        rules: [
            ...main.module!.rules!,
            DevStyle,
            {
                test: /\.(mp4|ico)$/i,
                use: 'file-loader',
            },
        ],
    },
    plugins: [
        new HtmlWP({
            template: resolve(DEV_DIR, 'template.html'),
        }),
    ],
    devtool: 'source-map',
    devServer: {
        port: 8000,
        hot: false,
        historyApiFallback: true,
        client: {
            logging: 'none',
        },
    },
}

export default DevConfig
