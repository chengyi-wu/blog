const webpack = require('webpack');

const config = {
    // entry: __dirname + '/js/index.jsx',
    entry : {
        add : __dirname + '/js/add.jsx',
        disp : __dirname + '/js/disp.jsx',
        edit: __dirname + '/js/edit.jsx'
    },
    output : {
        path : __dirname + '/dist',
        filename : '[name].js',
    },
    resolve : {
        extensions : ['.js', '.jsx', '.css']
    },
    module : {
        rules : [
            {
                test: /\.css$/,
                loaders: [
                  'style-loader',
                  'css-loader?modules'
                ]
            },
            {
                test : /\.jsx?/,
                exclude : /node_modules/,
                use: 'babel-loader'
            }
        ]
    }
};

module.exports = config;