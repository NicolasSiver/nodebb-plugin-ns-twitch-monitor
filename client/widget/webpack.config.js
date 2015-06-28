/**
 * Created by Nicolas on 6/28/15.
 */
/*eslint-disable */
module.exports = {
    entry    : "./index.js",
    output   : {
        path    : "../../public/js",
        filename: "widget.js"
    },
    externals: {
        "jquery": "jQuery",
        "socket": "socket"
    },
    module   : {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
        ]
    }
};