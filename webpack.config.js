var webpack = require('webpack');
var path = require('path');
var bowerComponent = path.resolve(__dirname, 'bower_components');
var nodeModules = path.resolve(__dirname, 'node_modules');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var Lazy = require(bowerComponent + '/lazy.js/lazy.js');

var app = {
    'app': {
        'js': [
            path.resolve(__dirname, 'src/client/app/js/angular/app/util.js'),
            path.resolve(__dirname, 'src/client/app/js/angular/app/app.js'),
            path.resolve(__dirname, 'src/client/app/js/angular/controller/index.js'),
            path.resolve(__dirname, 'src/client/app/js/angular/controller/sign-in.js'),
            path.resolve(__dirname, 'src/client/app/js/angular/factory/jquery.js')
        ],
        'template': [
            path.resolve(__dirname, 'src/client/app/js/angular/controller/template/header.html'),
            path.resolve(__dirname, 'src/client/app/js/angular/controller/template/footer.html'),
            path.resolve(__dirname, 'src/client/app/js/angular/controller/template/sign-in.html')
        ],
        'less': [
            path.resolve(__dirname, 'src/client/app/css/bootstrap/custom.less'),
            path.resolve(__dirname, 'src/client/app/css/app.less'),
            path.resolve(__dirname, 'src/client/app/css/sign-in/sign-in.less')
        ]
    },
    'data': {
        'js': [
            path.resolve(__dirname, 'src/client/data/js/angular/app/data.js'),
            path.resolve(__dirname, 'src/client/data/js/angular/value/pokemon.js'),
            path.resolve(__dirname, 'src/client/data/js/angular/value/pokemon-type.js'),
        ]
    },
    'world': {
        'js': [
            path.resolve(__dirname, 'src/client/world/js/angular/app/world.js'),
            path.resolve(__dirname, 'src/client/world/js/angular/controller/index.js')
        ],
        'template': [
            path.resolve(__dirname, 'src/client/world/js/angular/controller/template/index.html')
        ],
        'less': [
            path.resolve(__dirname, 'src/client/world/css/world.less')
        ]
    },
    'room': {
        'js': [
            path.resolve(__dirname, 'src/client/room/js/angular/app/room.js'),
            path.resolve(__dirname, 'src/client/room/js/angular/controller/index.js'),
            path.resolve(__dirname, 'src/client/room/js/angular/directive/list.js')
        ],
        'template': [
            path.resolve(__dirname, 'src/client/room/js/angular/controller/template/index.html'),
            path.resolve(__dirname, 'src/client/room/js/angular/directive/template/list.html')
        ],
        'less': [
            path.resolve(__dirname, 'src/client/room/css/room.less')
        ]
    },
    'user': {
        'js': [
            path.resolve(__dirname, 'src/client/user/js/angular/app/user.js'),
            path.resolve(__dirname, 'src/client/user/js/angular/directive/list.js')
        ],
        'template': [
            path.resolve(__dirname, 'src/client/user/js/angular/directive/template/list.html')
        ],
        'less': [
            path.resolve(__dirname, 'src/client/user/css/user.less')
        ]
    },
    'conversation': {
        'js': [
            path.resolve(__dirname, 'src/client/conversation/js/angular/app/conversation.js'),
            path.resolve(__dirname, 'src/client/conversation/js/angular/controller/index.js'),
            path.resolve(__dirname, 'src/client/conversation/js/angular/directive/conversation.js'),
            path.resolve(__dirname, 'src/client/conversation/js/angular/directive/messages.js')
        ],
        'template': [
            path.resolve(__dirname, 'src/client/conversation/js/angular/controller/template/index.html'),
            path.resolve(__dirname, 'src/client/conversation/js/angular/directive/template/conversation.html'),
            path.resolve(__dirname, 'src/client/conversation/js/angular/directive/template/messages.html')
        ],
        'less': [
            path.resolve(__dirname, 'src/client/conversation/css/conversation.less')
        ]
    },
    'pokemon': {
        'js': [
            path.resolve(__dirname, 'src/client/pokemon/js/angular/app/pokemon.js'),
            path.resolve(__dirname, 'src/client/pokemon/js/angular/controller/index.js')
        ],
        'template': [
            path.resolve(__dirname, 'src/client/pokemon/js/angular/controller/template/index.html')
        ],
        'image': [
            path.resolve(__dirname, 'src/client/pokemon/image/pokeball.png'),
            path.resolve(__dirname, 'src/client/pokemon/image/pokeball-white.png'),
            path.resolve(__dirname, 'src/client/pokemon/image/pokemons.png'),
            path.resolve(__dirname, 'src/client/pokemon/image/pokemons_left.png')
        ],
        'less': [
            path.resolve(__dirname, 'src/client/pokemon/css/pokemon.css'),
            path.resolve(__dirname, 'src/client/pokemon/css/pokemon-left.css'),
            path.resolve(__dirname, 'src/client/pokemon/css/pokemon-bag.less')
        ]
    },
    'battle': {
        'js': [
            path.resolve(__dirname, 'src/client/battle/js/angular/app/battle.js'),
            path.resolve(__dirname, 'src/client/battle/js/angular/controller/index.js')
        ],
        'template': [
            path.resolve(__dirname, 'src/client/battle/js/angular/controller/template/index.html'),
            path.resolve(__dirname, 'src/client/battle/js/angular/controller/template/control-panel.html')
        ],
        'less': [
            path.resolve(__dirname, 'src/client/battle/css/battle.less')
        ]
    }
};

var vendors = {
    js: {
        'json2': path.resolve(bowerComponent, 'json2-js/json2.js'),
        'jquery': path.resolve(bowerComponent, 'jquery/dist/jquery.js'),
        'bootstrap': path.resolve(bowerComponent, 'bootstrap/dist/js/bootstrap.js'),
        'es5-shim': path.resolve(bowerComponent, 'es5-shim/es5-shim.js'),
        'lazy': path.resolve(bowerComponent, 'lazy.js/lazy.js'),
        'q': path.resolve(bowerComponent, 'q/q.js'),
        'angular': path.resolve(bowerComponent, 'angular/angular.js'),
        'angular-animate': path.resolve(bowerComponent, 'angular-animate/angular-animate.js'),
        'angular-route': path.resolve(bowerComponent, 'angular-route/angular-route.js'),
        'angular-cookies': path.resolve(bowerComponent, 'angular-cookies/angular-cookies.js'),
        'angular-bindonce': path.resolve(bowerComponent, 'angular-bindonce/bindonce.js'),
        'angular-bootstrap': path.resolve(bowerComponent, 'angular-bootstrap/ui-bootstrap.js'),
        'angular-bootstrap-tpl': path.resolve(bowerComponent, 'angular-bootstrap/ui-bootstrap-tpls.js'),
        'angular-busy': path.resolve(bowerComponent, 'angular-busy/dist/angular-busy.js'),
        'angular-sanitize': path.resolve(bowerComponent, 'angular-sanitize/angular-sanitize.js'),
        'angular-elastic': path.resolve(bowerComponent, 'angular-elastic/elastic.js'),
        'angular-socket-io': path.resolve(bowerComponent, 'angular-socket-io/socket.js'),
        'moment': path.resolve(bowerComponent, 'moment/moment.js'),
        //'angular-monent': path.resolve(bowerComponent, 'angular-moment/angular-moment.js'),
        'bootbox': path.resolve(bowerComponent, 'bootbox/bootbox.js'),
        'ngBootbox': path.resolve(bowerComponent, 'ngBootbox/dist/ngBootbox.js'),
        'i18next': path.resolve(bowerComponent, 'i18next/i18next.js'),
        'ng-i18next': path.resolve(bowerComponent, 'ng-i18next/dist/ng-i18next.js'),
        'nya-bootstrap-select': path.resolve(bowerComponent, 'nya-bootstrap-select/dist/js/nya-bs-select.js'),
        'wow': path.resolve(bowerComponent, 'wow/dist/wow.js')
    },
    css: {
        'bootstrap': bowerComponent + '/bootstrap/dist/css/bootstrap.css',
        'font-awesome': bowerComponent + '/font-awesome/css/font-awesome.css'
    }
};

var config = {
    addVendor: function (name, path) {
        this.resolve.alias[name] = path;
        this.module.noParse.push(name);
        this.entry.vendors.push(name);
    },
    addApp: function (path) {
        this.entry.app.push(path);
    },
    entry: {
        acme: [
            'file?name=[name].[ext]!' + path.resolve(__dirname, 'src/client/index.html'),
            path.resolve(__dirname, 'src/client/app/image/favicon.ico')
        ],
        locale: [
            'file?name=locale/[name].[ext]!' + path.resolve(__dirname, 'src/client/locale/en.json'),
            'file?name=locale/[name].[ext]!' + path.resolve(__dirname, 'src/client/locale/jp.json'),
            'file?name=locale/[name].[ext]!' + path.resolve(__dirname, 'src/client/locale/zh_hk.json')
        ],
        vendors: [],
        app: []
    },
    resolve: {
        alias: {}
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin(
            'vendors', 'vendors.js'
        ),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            "root.jQuery": "jquery",
            "window.i18n": "i18next",
            "Lazy": "lazy"
        })
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        chunkFilename: "[id].js"
    },
    module: {
        loaders: [
            {
                test: require.resolve(path.resolve(bowerComponent, 'jquery/dist/jquery.js')),
                loader: 'expose?jQuery'
            },
            {
                test: require.resolve(path.resolve(bowerComponent, 'lazy.js/lazy.js')),
                loader: 'expose?Lazy'
            },
            {
                test: /\.less$/,
                loader: "style!css!less"
            },
            {
                test: /\.css$/,
                loader: "style!css"
            },
            {
                test: /(\.ttf|\.eot|\.woff2|\.woff|\.svg|\.ico)(\?v=[0-9]\.[0-9]\.[0-9])*$/,
                loader: 'file?name=assets/[name].[ext]'
            }
        ],
        noParse: []
    }
};

// vendors javascript
Lazy(vendors.js).each(function (path, name) {
    config.addVendor(name, path);
});

// vendors css
Lazy(vendors.css).each(function (path, name) {
    config.addVendor('css.' + name, path);
});

// app
Lazy(app).each(function (configs, moduleName) {
    Lazy(configs).each(function (paths, type) {
        Lazy(paths).each(function (path) {
            if (type === 'js' || type === 'less') {
                config.addApp(path);
            } else {
                config.addApp('file?name=' + moduleName + '/[name].[ext]!' + path);
            }
        });
    });
});

module.exports = config;