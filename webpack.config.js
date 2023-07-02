const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/script.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash].js',
    },
    devServer: {
        port: 3000,
    },
    plugins: [
        new HTMLWebpackPlugin({template: path.join(__dirname, '/src/index.html')}),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(css|less)$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            }
        ]
    }
}
