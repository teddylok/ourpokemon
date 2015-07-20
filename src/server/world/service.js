var vsprintf = require("sprintf-js").vsprintf;
var world = require('./world');
var worldService = {};

/**
 * create a room
 *
 * @param name
 */
worldService.createRoom = function (name) {
    var Room = require('../room/room');
    var roomId = world.getDisplayRooms().length + 1;
    name = name || roomId;

    var room = new Room();
    room.setName(name);
    room.setId(roomId);
    
    world.setRoom(room);

    console.log(vsprintf('[world]\t\troom created: [id=%d], [name=%s]', [
        room.getId(),
        room.getName()
    ]));

    return room;
};

/**
 *
 * @param socket
 * @param roomId
 * @returns {boolean}
 */
worldService.joinRoom = function (socket, roomId) {
    var oldRoomId = (socket.room) ? socket.room.getId() : 0;
    socket.room = world.getRoom(roomId);

    if (!socket.room) {
        return false;
    }

    socket.leave(oldRoomId);
    socket.join(roomId);
    
    console.log(vsprintf('[world]\t\t%s joined room [id=%d], [name=%s]', [
        (socket.user) ? socket.user.getUsername() : 'guest',
        socket.room.getId(),
        socket.room.getName()
    ]));

    return true;
};

module.exports = worldService;