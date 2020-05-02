const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        index: './src/script/index.js'
    },
    output: {
        path: path.resolve(__dirname, "build/script"),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, 'src/script')
                ],
                loader: 'babel-loader'
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                    'less-loader',
                ],
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '../style/[name].css' // 輸出到相對於該（script>index.js）文件的上級style目錄中【output onup dir of relative the script>index.js】
        }),
    ],
    // configure the global varibale
    // externals:{
    //     'react':'React',
    //     'react-dom':'ReactDOM'
    // },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                    // cacheGroupKey here is `commons` as the key of the cacheGroup
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        },
        minimizer: [
            new UglifyJsPlugin({
                test: /\.js(\?.*)?$/i,
            })],
    }
}