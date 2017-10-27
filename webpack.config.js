const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    devServer: { inline: true },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader']
                })
                // : [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.(jpe?g|png)$/i,
                use: [
                   /* {
                        loader: 'file-loader',
                        options: {
                            name: './images/[name].[ext]'
                        }
                    },*/
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            gifsicle: {
                                interlaced: false,
                            },
                            optipng: {
                                optimizationLevel: 7,
                            },
                            mozjpeg: {
                                progressive: true,
                                quality: 50
                            },
                            // Specifying webp here will create a WEBP version of your JPG/PNG images
                            webp: {
                                quality: 75
                            }
                        }
                    },
                    {
                        loader: 'responsive-loader',
                        options: {
                            // If you want to enable sharp support:
                            adapter: require('responsive-loader/sharp'),
                            sizes: [300, 1024],
                            name: './images/[name]-[width].[ext]'
                        }
                    },

                ]
            }/*,
            {
                test: /\.(gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: './images/[name].[ext]'
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            gifsicle: {
                                interlaced: false,
                            },
                            optipng: {
                                optimizationLevel: 7,
                            },
                            mozjpeg: {
                                progressive: true,
                                quality: 50
                            },
                            // Specifying webp here will create a WEBP version of your JPG/PNG images
                            webp: {
                                quality: 75
                            }
                        }
                    }
                ]
            }*/
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new ExtractTextPlugin({
            filename: './css/[name].css'
        })
    ]
};