var vsprintf = require("sprintf-js").vsprintf;
var world = require('../world/world');
var Pokemon = require('../pokemon/pokemon');
var userService = {};

userService.getToken = function (username, password) {
    var md5 = require('js-md5');
    return md5(username + password);
};

userService.createUser = function(username, password) {
    var User = require('./user');
    
    var user = new User(username);
    user.setToken(userService.getToken(username, password));
    
    var defaultPokemonNumber = [1, 4, 7];
    var pokemonId = user.addPokemon(new Pokemon(defaultPokemonNumber[Math.ceil(Math.random() * 2)]));
    user.assignPokemonToTeam(pokemonId);
    
    console.log(vsprintf('[user]\t\tuser created, [username=%s], [password=%s]', [
        username,
        password
    ]));
    
    console.log(username, user);
    
    return user;
};

userService.signIn = function(socket, username, password) {
    var user = world.getUser(username);
    var ip = socket.request.connection.remoteAddress;

    // create new user
    if (!user) {
        socket.user = userService.createUser(username, password);
        socket.user.setIp(ip);
        world.addUser(socket.user);
        return true;
    }
    
    return userService.signInWithPassword(socket, username, password);
};

userService.signInWithPassword = function(socket, username, password) {
    var user = world.getUser(username);
    var authentication = false;
    
    if (user.getToken() == userService.getToken(username, password)) {
        socket.user = user;
        authentication = true;

        console.log(vsprintf('[user]\t\tsign in successful, [username=%s], [password=%s]', [
            username,
            password
        ]));
    } else {
        socket.user = null;
        authentication = false;

        console.log(vsprintf('[warning][user]\t\tauthentication failure, [username=%s], [password=%s]', [
            username,
            password
        ]));
    }
    
    return authentication;
};

userService.signInWithToken = function(socket, username, token) {
    var user = world.getUser(username);
    var clientIp = socket.request.connection.remoteAddress;
    var authentication = false;

    if (user && user.token == token) {
        socket.user = user;
        socket.user.setIp(clientIp);
        authentication = true;

        console.log(vsprintf('[user]\t\tsign in with token successful, [username=%s]', [
            username
        ]));
    } else {
        socket.user = {};
        authentication = false;

        console.log(vsprintf('[warning][user]\t\tauthentication failure, [username=%s], [token=%s]', [
            username,
            token
        ]));
    }
    
    return authentication;
};

module.exports = userService;