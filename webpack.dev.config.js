const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    context: __dirname,
    mode: 'development',
    entry: './dev/App.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.(tsx|ts)?$/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        configFile: 'tsconfig.dev.json',
                    },
                },
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(mp4|ico)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './dev/template.html',
        }),
    ],
    devtool: 'source-map',
    optimization: {
        minimize: false,
    },
    devServer: {
        compress: true,
        port: 8000,
        open: false,
        devMiddleware: {
            writeToDisk: false,
        },
        client: {
            logging: 'none',
        },
    },
}
