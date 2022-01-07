import { RuleSetRule, RuleSetUseItem } from 'webpack'

const STYLE_RE = /\.(css|(s[ac]ss))$/i

export const CssLoaders: RuleSetUseItem[] = ['style-loader', 'css-loader']

export const SassLoaders: RuleSetUseItem[] = [
    {
        loader: 'sass-loader',
        options: {
            sassOptions: {
                includePaths: ['./src/sass'],
            },
        },
    },
]

export const DevStyle: RuleSetRule = {
    test: STYLE_RE,
    use: [...CssLoaders, ...SassLoaders],
}
export const BuildStyle: RuleSetRule = {
    test: STYLE_RE,
    use: [...CssLoaders, 'postcss-loader', ...SassLoaders],
}
