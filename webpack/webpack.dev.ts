// types
import { Configuration } from 'webpack'
import { Configuration as DevConfiguration } from 'webpack-dev-server'

// styles
import { DevStyle } from './config/style'
import { DevTS } from './config/ts'

// path
import { DEV_DIR } from './config/path'
import { resolve } from 'path'

// plugins
import HtmlWP from 'html-webpack-plugin'

// base configs
import { MCFG } from './webpack.config'

interface Config extends Configuration {
    devServer: DevConfiguration
}

const BuildConfig: Config = {
    ...MCFG,
    mode: 'development',
    entry: resolve(DEV_DIR, 'App.tsx'),
    module: {
        rules: [
            ...MCFG.module!.rules!,
            DevStyle,
            DevTS,
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
    optimization: {
        ...MCFG.optimization!,
        minimize: false,
    },
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

export default BuildConfig
