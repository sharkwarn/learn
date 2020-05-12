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
    plugins: [
        new HtmlWebpackPlugin()
    ]
})

const server = new webpackDevServer(compile, {
    overlay: true,
    contentBase: path.join(__dirname, '../dist'),
    port: 5000,
    open: true,
    hot: true
});

server.listen(5000, 'localhost', () => {
    console.log('dev server listening on port 5000');
  });
  

