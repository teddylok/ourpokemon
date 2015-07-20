var vsprintf = require("sprintf-js").vsprintf;
var Lazy = require('../../../bower_components/lazy.js');

var world = {
    name: '',
    rooms: [],
    users: []
};

/**
 * set world name
 *
 * @param name
 */
world.setName = function (name) {
    world.name = name;
};

/**
 * get world name
 *
 * @returns string
 */
world.getName = function () {
    return world.name;
};

/**
 * add a user
 *
 * @param user
 */
world.addUser = function (user) {
    world.users.push(user);
};

/**
 * get user object
 *
 * @param username
 * @returns {*|boolean}
 */
world.getUser = function (username) {
    var user = Lazy(world.users).find(function (user) {
        return user.getUsername() == username;
    });

    if (!user) {
        console.log(vsprintf('[error][world]\t\tuser does not exist, [username=%s]', [
            username
        ]));
        return false;
    }

    return user;
};

/**
 * get lobby
 *
 * @returns {*}
 */
world.getLobby = function () {
    return world.getRoom(1);
};

/**
 * set room object
 * @param room
 */
world.setRoom = function (room) {
    world.rooms.push(room);
};

/**
 * get room object
 *
 * @param roomId
 * @returns {*}
 */
world.getRoom = function (roomId) {
    var room = Lazy(world.rooms).find(function (room) {
        return room.getId() == roomId;
    });

    if (!room) {
        console.log(vsprintf('[error][world]\t\troom does not exist, [id=%d]', [
            roomId
        ]));
        return false;
    }

    return room;
};

/**
 * get room list for display usage
 *
 * @returns {Array}
 */
world.getDisplayRooms = function () {
    var rooms = [];

    Lazy(world.rooms).each(function (room) {
        rooms.push({
            id: room.id,
            name: room.name
        });
    });

    return rooms;
};

/**
 * get user list for display usage
 *
 * @returns {Array}
 */
world.getDisplayUsers = function () {
    var users = [];

    Lazy(world.users).each(function (user) {
        users.push({
            username: user.getUsername()
        });
    });

    return users;
};

module.exports = world;