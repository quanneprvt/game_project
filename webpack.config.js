const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
          title: 'game_project'
        }),
        new CopyPlugin([
            { from: 'src/assets', to: 'assets' },
            { from: 'src/font', to: 'font' },
        ]),
    ],
    devServer: {
        contentBase: './dist'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                'style-loader',
                'css-loader'
                ]
            },
            {
               test: /\.(png|svg|jpg|gif)$/,
               use: [
                 'file-loader'
               ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                'file-loader'
                ]
            }
        ]
    }
};