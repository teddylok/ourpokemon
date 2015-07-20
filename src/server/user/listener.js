module.exports = {
    listen: function(io) {
        var userService = require('./service');
        
        io.sockets.on('connection', function (socket) {
            
            socket.on('signIn', function (options) {
                userService.signIn(socket, options.username, options.password);
                socket.emit('signInSuccess', socket.user);
            });

            socket.on('signInWithToken', function (options) {
                if (userService.signInWithToken(socket, options.username, options.token)) {
                    socket.emit('signInWithTokenSuccess', socket.user);
                } else {
                    socket.user = null;
                    socket.emit('authenticationRejected');
                }
            });
            
            socket.on('getPokemonBox', function(){
                if (!socket.user) {
                    return false;
                }
                
                socket.emit('updatePokemonBox', socket.user.getPokemons());
            });

            socket.on('getPokemonTeam', function(){
                if (!socket.user) {
                    return false;
                }

                updatePokemonTeam();
            });
            
            socket.on('assignPokemonToTeam', function(pokemonNo){
                if (!socket.user) {
                    return false;
                }
                
                socket.user.assignPokemonToTeam(pokemonNo);
                updatePokemonTeam();
            });

            socket.on('declinePokemonToTeam', function(pokemonNo){
                if (!socket.user) {
                    return false;
                }

                socket.user.declinePokemonToTeam(pokemonNo);
                updatePokemonTeam();
            });
            
            function updatePokemonTeam() {
                socket.emit('updatePokemonTeam', socket.user.getPokemonTeam());
            }
        });
    }
};