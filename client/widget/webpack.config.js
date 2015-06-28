/**
 * Created by Nicolas on 6/28/15.
 */
module.exports = {
    entry: "./index.js",
    output: {
        path: "../../public/js",
        filename: "widget.js"
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
        ]
    }
};