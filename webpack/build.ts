// types
import { Configuration } from 'webpack'

// styles
import { BuildStyle } from './config/style'

// path
import { LIB_DIR, resolve, SRC_DIR } from './config/path'

// base configs
import main from './main'

const BuildConfig: Configuration = {
    ...main,
    mode: 'production',
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
        rules: [...main.module!.rules!, BuildStyle],
    },
    optimization: {
        emitOnErrors: false,
        minimize: true,
    },
}

export default BuildConfig
