const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');

const compile = webpack({
    entry: path.resolve(__dirname, '../src/index.js'),
    mode: 'development',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, '../dist/')
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../index.html')
        })
    ]
})

const server = new webpackDevServer(compile, {
    overlay: true,
    contentBase: path.join(__dirname, '../dist'),
    port: 5000,
    open: true,
    hot: false
});

server.listen(5000, 'localhost', () => {
    console.log('dev server listening on port 5000');
});
  

