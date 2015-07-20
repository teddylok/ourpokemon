var worldService = require('./service');
var vsprintf = require("sprintf-js").vsprintf;
var world = require('./world');

module.exports = {
    listen: function (io) {
        io.sockets.on('connection', function (socket) {
            
            socket.on('createRoom', function (name) {
                if (worldService.createRoom(name)) {
                    socket.emit('updateRooms', world.getDisplayRooms());
                }
            });

            socket.on('joinRoom', function (roomId) {
                if (worldService.joinRoom(socket, roomId)) {
                    socket.emit('joinRoomSuccess', roomId);
                }
            });

            socket.on('getRooms', function () {
                socket.emit('updateRooms', world.getDisplayRooms());
            });

            socket.on("getUsers", function () {
                socket.emit('updateUsers', world.getDisplayUsers());
            });

            function init() {
                if (!socket.room) {
                    worldService.joinRoom(socket, world.getLobby().getId());
                }
                
                console.log(vsprintf('[world]\t\tconnection: [ip=%s], [username=%s]',[
                    socket.request.connection.remoteAddress,
                    (socket.user) ? socket.user.getUsername() : 'guest'
                ]));
            }
            
            init();

        });
    }
};