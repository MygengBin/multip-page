const path = require('path');
const TerserWebpackPlugin = require("terser-webpack-plugin");
const htmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
module.exports={
    entry:'./src/index.js',
    output:{
        filename: path.basename(__dirname)+".js",
        path: path.resolve(__dirname, 'dist')
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserWebpackPlugin()]
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude:/(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader", // 用babel-loader处理
                    options: {
                        "presets": [
                            ["@babel/preset-env", {
                                "targets": {
                                    "browsers": ["> 1%", "last 2 versions"]
                                }
                            }]
                        ]
                    }
                }
            }
        ],
    },
    plugins:[
        new CleanWebpackPlugin(),
        new htmlWebpackPlugin({
            filename:'index.html',
            template:'index.html'  
        })
    ],
    devtool: "inline-source-map",
    devServer:{
        host:'0.0.0.0',
        port:8080
    },
}