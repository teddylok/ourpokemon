var vsprintf = require("sprintf-js").vsprintf;
var Lazy = require('../../../bower_components/lazy.js');

module.exports = function () {
    var room = {
        id: 0,
        name: "",
        member: [],
        battles: []
    };
    
    room.setId = function(id) {
        room.id = id;
    };

    room.getId = function() {
        return room.id
    };

    room.setName = function(name) {
        room.name = name;
    };
    
    room.getName = function() {
        return room.name;
    };

    room.setBattle = function(battle) {
        room.battles.push(battle);
    };
    
    room.getBattle = function(id) {
        var battle = Lazy(room.battles).find(function (battle) {
            return battle.getId() == id;
        });

        if (!battle) {
            console.log(vsprintf('[error][room]\t\tbattle does not exist, [id=%s]', [
                id
            ]));
            return false;
        }
        
        return battle;
    };
    
    room.getBattles = function() {
        return room.battles;
    };
    
    function init() {
        
    }
    
    init();
    
    return room;
};