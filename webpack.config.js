const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
var ImageminPlugin = require('imagemin-webpack-plugin').default
var imageminMozjpeg = require('imagemin-mozjpeg');

module.exports = {
    entry: './src/index.js',
    devServer: {
        inline: true,
        contentBase: './dist'
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    module: {
        rules: [

            {
                test: /\.(gif|png|jpe?g)$/i,
                exclude: [
                    path.resolve(__dirname, "node_modules/font-awesome/fonts")
                ],
                use: [
                    {
                        loader: 'advanced-image-loader',
                        options: {
                            //  width: 1280,
                            srcset: [320, 480, 640, 960, 1280, 1920],
                            // quality: 100,
                            placeholder: 32,
                            name: 'images/[name]-[width]',
                        }
                    }
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
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            interpolate: true,
                        }
                    }]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new ImageminPlugin({
            test: /\.(jpe?g|png|gif|svg)$/i,
            plugins: [
                imageminMozjpeg({
                  quality: 50,
                  progressive: true
                })
              ],
            pngquant: {
                quality: '50'
            },
            svgo:{

            },
            jpegtran: null
        })
    ]
};