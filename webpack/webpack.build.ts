// types
import { Configuration } from 'webpack'

// styles
import { BuildStyle } from './config/style'
import { BuildTS } from './config/ts'

// base configs
import { MCFG } from './webpack.config'

const BuildConfig: Configuration = {
    ...MCFG,
    mode: 'production',
    module: {
        rules: [...MCFG.module!.rules!, BuildStyle, BuildTS],
    },
}

export default BuildConfig
