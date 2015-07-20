var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var path = require('path');
var Lazy = require('../../bower_components/lazy.js');
var vsprintf = require("sprintf-js").vsprintf;

var fs = require('fs');

process.env['NODE_CONFIG_DIR'] = path.resolve(__dirname, 'config');
var config = require('config');

console.log('+---------------------------------------+');
console.log('|              Our Pokemon              |');
console.log('+---------------------------------------+');

// server
console.log(vsprintf('[server]\tip: %s', [
    config.server.ip
]));

// port
console.log(vsprintf('[server]\tport: %s', [
    config.server.port
]));
server.listen(config.server.port);

// create world
var world = require('./world/world');
var worldService = require('./world/service');

world.setName(config.server.name);

console.log(vsprintf('[world]\t\tworld created: %s', [
    world.getName()
]));

// create lobby
worldService.createRoom('Lobby');

// setup socket listener
var listeners = [
    require('./world/listener'),
    require('./room/listener'),
    require('./battle/listener'),
    require('./user/listener'),
    require('./conversation/listener')
];

Lazy(listeners).each(function(listener){
    listener.listen(io);
});