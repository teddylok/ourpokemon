module.exports = {
    listen: function (io) {
        io.sockets.on('connection', function (socket) {
            var vsprintf = require("sprintf-js").vsprintf;
            
            socket.on('sendMessage', function (message) {
                if (!socket.user) {
                    return false;
                }
                
                console.log(vsprintf('[conversation]\t\tsend message, [username=%s], [message=%s]', [
                    socket.user.getUsername(),
                    message
                ]));

                io.sockets.to(socket.room.getId()).emit('updateMessage', socket.user.getUsername(), message);
            });
        });
    }
};