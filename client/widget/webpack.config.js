/**
 * Created by Nicolas on 6/28/15.
 */
/*eslint-disable */
const path = require('path');

module.exports = {
    entry    : "./index.js",
    output   : {
        path    : path.resolve(__dirname,"../../public/js"),
        filename: "widget.js"
    },
    externals: {
        "jquery"   : "jQuery",
        "socket"   : "socket",
        "templates": "templates"
    },
    module: {
          rules: [
            {
              test: /\.js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env']
                }
              }
            }
          ]
    }
};
