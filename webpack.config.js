const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'cryptos.js',
        library: 'cryptos',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    resolve: {
        extensions: ['.js']
    },
    devtool: 'eval',
    module: {
        // loaders
        rules: [
            {
                test: /\.js/,
                include: path.resolve(__dirname, 'src'),
                loader: 'babel-loader'
            }
        ]
    }
}