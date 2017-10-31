const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')

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
                test: /\.html$/,
                loader: 'html-loader'

            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/',    // where the fonts will go
                        publicPath: '../'       // override the default path
                    }
                }]
            },

            /* {
                 test: /\.css$/,
                 use: ExtractTextPlugin.extract({
                     fallback: 'style-loader',
                     use: ['css-loader']
                 })
 
             },*/
            {
                test: /\.(gif|png|jpe?g)$/i,
                use: [
                    {
                        loader: 'responsive-loader',
                        options: {
                            // If you want to enable sharp support:
                            adapter: require('responsive-loader/sharp'),
                            sizes: [1024, 800, 300, 6400],
                            name: 'images/[name]-[width].[ext]',
                            outputPath: 'images/',
                            publicPath: 'images/',
                            placeholder: true,
                            placeholderSize: 50,
                            quality: 20
                        }
                    },
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'images/',
                            publicPath: 'images/'
                        }
                    }

                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new ExtractTextPlugin({
            filename: './css/[name].css'
        })/*,
        new ExtractTextPlugin({
            filename: "[name].[contenthash].css"
        })*/
    ]
};