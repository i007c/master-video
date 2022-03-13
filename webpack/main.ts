import { Configuration } from 'webpack'

const Main: Configuration = {
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(tsx|ts)?$/,
                exclude: /node_modules/,
                use: 'ts-loader',
            },
        ],
    },
    resolve: {
        extensions: ['.mjs', '.tsx', '.ts', '.js'],
    },
}

export default Main
