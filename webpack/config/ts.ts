import { RuleSetRule } from 'webpack'

// path
import { resolve } from 'path'
import { TSCONFIG_DIR } from './path'

const BaseTS: RuleSetRule = {
    test: /\.(tsx|ts)?$/,
    exclude: /node_modules/,
}

export const DevTS: RuleSetRule = {
    ...BaseTS,
    use: {
        loader: 'ts-loader',
        options: {
            configFile: resolve(TSCONFIG_DIR, 'tsconfig.dev.json'),
        },
    },
}
export const BuildTS: RuleSetRule = {
    ...BaseTS,
    use: {
        loader: 'ts-loader',
        options: {
            configFile: resolve(TSCONFIG_DIR, 'tsconfig.build.json'),
        },
    },
}
