'use strict';

var Lazy = require('../../../bower_components/lazy.js');
var Merge = require('merge');

module.exports = function () {
    var battle = {
        id: 0,
        trainers: [],
        teams: [],
        map: []
    };

    battle.setId = function(id) {
        battle.id = id;
    };

    battle.getId = function() {
        return battle.id
    };
    
    battle.setTrainer = function(trainer) {
        battle.trainers.push(trainer);
    };
    
    battle.getTrainers = function() {
        return battle.trainers;
    };
    
    battle.setTeam = function(team) {
        if (battle.teams.length > 2) {
            return false;
        }

        battle.teams.push(team);

        if (battle.teams.length == 1) {
            for (var i = 0; i < 6; i++) {
                if (team[i]) {
                    battle.map[0][i] = Merge(battle.map[0][i], team[i]);
                }
            }
        } else {
            
        }
    };

    battle.getTeams = function() {
        return battle.teams;
    };
    
    battle.getMap = function() {
        return battle.map;
    };

    function init() {
        // create map
        for (var x = 0; x < 6; x++) {
            battle.map[x] = [];
            for (var y = 0; y < 6; y++) {
                battle.map[x][y] = {x: x, y: y};
            }
        }
    }

    init();

    return battle;
};