const path = require('path')

module.exports = {
    context: __dirname,
    mode: 'production',
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'lib'),
        clean: true,
        library: {
            name: 'MasterVideo',
            type: 'umd',
            export: 'default',
            umdNamedDefine: true,
        },
        filename: 'index.js',
    },
    module: {
        rules: [
            {
                test: /\.(tsx|ts)?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [],
    devtool: 'source-map',
    optimization: {
        minimize: true,
    },
}
