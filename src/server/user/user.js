var vsprintf = require("sprintf-js").vsprintf;

module.exports = function (username) {
    var user = {
        username: username,
        token: '',
        ip: '0.0.0.0',
        pokemons: [],
        pokemonTeam: [],
        catchTotal: 0
    };
    
    user.getUsername = function () {
        return user.username;
    };

    user.setIp = function(ip) {
        user.ip = ip;
    };

    user.getIp = function() {
        return user.ip
    };

    user.setToken = function(token) {
        user.token = token;
    };

    user.getToken = function() {
        return user.token;
    };
    
    user.getPokemonTeam = function() {
        return user.pokemonTeam;
    };
    
    user.getPokemons = function() {
        return user.pokemons;
    };
    
    user.addPokemon = function(pokemon) {
        pokemon.setId(++user.catchTotal);
        user.pokemons.push(pokemon);
        
        return pokemon.getId();
    };
    
    user.assignPokemonToTeam = function(pokemonNo) {
        if (user.pokemonTeam.length == 6) {
            console.log(vsprintf('[error][user] Team is full, [username=%s]', [
                user.getUsername()
            ]));
            return false;
        }
        
        user.pokemonTeam.push(pokemonNo);
    };
    
    user.declinePokemonToTeam = function(pokemonNo) {
        user.pokemonTeam = Lazy(user.pokemonTeam).filter(function(pokemon){
            return pokemon.no != pokemonNo;
        });
    };

    return user;
};