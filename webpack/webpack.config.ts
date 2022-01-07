import { Configuration } from 'webpack'

// path
import { LIB_DIR, SRC_DIR } from './config/path'
import { resolve } from 'path'

export const MCFG: Configuration = {
    entry: resolve(SRC_DIR, 'index.tsx'),
    output: {
        path: LIB_DIR,
        clean: true,
        sourceMapFilename: 'maps/[file].map',
        filename: 'index.js',
        library: {
            name: 'MasterVideo',
            type: 'umd',
            export: 'default',
            umdNamedDefine: true,
        },
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
    resolve: {
        extensions: ['.mjs', '.tsx', '.ts', '.js'],
    },
    devtool: 'source-map',
    optimization: {
        emitOnErrors: false,
        minimize: true,
    },
}
