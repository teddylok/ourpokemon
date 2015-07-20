var battleService = require('./service');

module.exports = {
    listen: function (io) {
        io.sockets.on('connection', function (socket) {
            socket.on('disconnect', function () {
                if (socket.room) {
                    socket.leave(socket.room.getId());
                }
                socket.room = null;
            });

            socket.on('joinBattle', function(battleId){
                var battle = socket.room.getBattle(battleId);

                socket.emit('updateBattle', battle.getId());
            });
        });
    }
};