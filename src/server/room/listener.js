var roomService = require('./service');

module.exports = {
    listen: function (io) {
        io.sockets.on('connection', function (socket) {
            socket.on('disconnect', function () {
                if (socket.room) {
                    socket.leave(socket.room.getId());
                }
                socket.room = null;
            });
            
            socket.on('startWildBattle', function(){
                var battle = roomService.createWildBattle(socket.room, socket.user);
                
                socket.emit('updateBattle', battle.getId());
            });
        });
    }
};