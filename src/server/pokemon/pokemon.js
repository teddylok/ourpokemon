module.exports = function (number) {
    var pokemon = {
        id: 0,
        number: number,
        hp: 0,
        attack: 0,
        defence: 0,
        specialAttack: 0,
        specialDefence: 0,
        speed: 0
    };

    pokemon.getNumber = function () {
        return pokemon.number
    };
    
    pokemon.setId = function(id) {
        pokemon.id = id;
    };
    
    pokemon.getId = function(id) {
        return pokemon.id;
    };

    function init() {
        pokemon.hp = Math.ceil(Math.random() * 31);
        pokemon.attack = Math.ceil(Math.random() * 31);
        pokemon.defence = Math.ceil(Math.random() * 31);
        pokemon.specialAttack = Math.ceil(Math.random() * 31);
        pokemon.specialDefence = Math.ceil(Math.random() * 31);
        pokemon.speed = Math.ceil(Math.random() * 31);
    };

    init();

    return pokemon;
};