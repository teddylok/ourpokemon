var Battle = require('../battle/battle');
var Pokemon = require('../pokemon/pokemon');
var roomService = {};

/**
 * create a wild battle
 * 
 * @param trainer
 */
roomService.createWildBattle = function(room, trainer) {
    var battle = new Battle();
    battle.setTrainer(trainer);

    var wildTeam = [];
    
    for (var i = 0; i < 3; i++) {
        var number = Math.ceil(Math.random() * 712);
        var pokemon = new Pokemon(number);
        
        wildTeam.push(pokemon);
    }
    
    battle.setTeam(wildTeam);
    battle.setTeam(trainer.getPokemonTeam());
    battle.setId(room.getBattles().length + 1);
    
    room.setBattle(battle);
    
    return battle;
};

module.exports = roomService;