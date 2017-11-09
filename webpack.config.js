const path = require('path');
//const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
    entry: './src/index.js',
    //stats: "verbose",
    devServer: {
        inline: true,
        contentBase: './dist'
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/'
    },
 //   context: path.resolve(__dirname, '../'),

    module: {
        rules: [

            {
                test: /\.(gif|png|jpe?g)$/i, 
                exclude: [
                    path.resolve(__dirname, "node_modules/font-awesome/fonts")
                ],
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'images/'
                        }
                    }
                    /*,{
                        loader: 'responsive-loader',
                        options: {
                            // If you want to enable sharp support:
                            adapter: require('responsive-loader/sharp'),
                            sizes: [1024, 800, 300, 6400],
                            name: 'images/[name]-[width].[ext]',
                            outputPath: 'images/',
                           
                            quality: 20
                        }
                    }
                    */

                ]               
            },
            {
            test: /\.(svg)$/i, 
            exclude: [
                path.resolve(__dirname, "node_modules/font-awesome/fonts")
            ],
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'images/'
                    }
                }

            ]
        },
            {
                test: /\.scss$/,
                use: [
                    {
                    loader: 'file-loader',
                    options: {
                        name: '[name].css'
                    }
                },
                {
                    loader: 'extract-loader',
                   
                },
                { loader: 'css-loader' },
                { loader: 'sass-loader' }
            ]
            },
            
            {
                test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                include: [
                    path.resolve(__dirname, "node_modules/font-awesome/fonts")
                ],
                exclude: [
                    path.resolve(__dirname, "src/images")
                ],
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/',    // where the fonts will go
                        publicPath: '../'       // override the default path
                    }
                }]
            },
            {
                test: /\.(html)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]'
                    }
                },
                {
                    loader: 'extract-loader'
                },
                {
                    loader: 'html-loader',
                    options: {
                        attrs: ["img:src","img:srcset", "link:href"]
                    }
                }]
            }
            /*{
                test: /\.(gif|png|jpe?g)$/i,
                exclude: [
                    path.resolve(__dirname, "node_modules/font-awesome/fonts")
                ],
                use: [
                    {
                        loader: 'responsive-loader',
                        options: {
                            // If you want to enable sharp support:
                            adapter: require('responsive-loader/sharp'),
                            sizes: [1024, 800, 300, 6400],
                            name: 'images/[name]-[width].[ext]',
                            outputPath: 'images/',
                            placeholder: true,
                            placeholderSize: 50,
                            quality: 20
                        }
                    },
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'images/'
                        }
                    }

                ]
            }*/
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        /*  new HtmlWebpackPlugin({
              template: './src/index.html'
          }),
          new ExtractTextPlugin({
              filename: './css/[name].css'
          })*//*,
new ExtractTextPlugin({
    filename: "[name].[contenthash].css"
})*/
    ]
};