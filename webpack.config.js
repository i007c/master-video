const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

var config = {
    entry: './src/App.tsx',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        sourceMapFilename: 'SourceMaps/[file].map',
        assetModuleFilename: 'static/[hash][ext][query]',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: [/\.s[ac]ss$/i, /\.css$/i],
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(ico|mp4)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: path => {
                                if (path.search('favicon.ico') !== -1)
                                    return 'favicon.ico'
                                else return 'static/[name].[ext]'
                            },
                        },
                    },
                ],
                type: 'javascript/auto',
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/static/template.html',
            inject: true,
            publicPath: '/',
            templateParameters: {
                SiteName: 'Video Player',
            },
        }),
    ],
    devServer: {
        compress: true,
        port: 8000,
    },
}

module.exports = (env, argv) => {
    if (argv.mode === 'development') {
        config.devtool = 'source-map'
    }

    return config
}