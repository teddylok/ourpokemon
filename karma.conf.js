var webpack = require('./node_modules/webpack');

module.exports = function (config) {
    config.set({
        //run in Chrome
        browsers: [ 'Chrome' ],

        //just run once by default
        singleRun: true,

        //use the jasmine test framework
        frameworks: [ 'jasmine' ],

        //just load this file
        files: [
            './all-test-suite.js'
        ],

        //preprocess with webpack and our sourcemap loader
        preprocessors: {
            './all-test-suite.js': [ 'webpack', 'sourcemap' ]
        },

        //report results in this format
        reporters: [ 'dots' ],

        //kind of a copy of your webpack config
        webpack: {
            //just do inline source maps instead of the default
            devtool: 'inline-source-map',
            
            module: {
                loaders: [
                    { test: /\.js$/, loader: 'babel-loader' }
                ]
            }
        },
        webpackServer: {
            noInfo: true
        }
    });
};