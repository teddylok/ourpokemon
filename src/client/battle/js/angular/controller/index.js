angular.module('ourPokemon.battle')
    .config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider
                .when('/battle/:battleId', {
                    templateUrl: '/battle/index.html',
                    controller: 'opBattleIndexController'
                })
        }])
    .controller('opBattleIndexController', ['$scope', '$socket', '$routeParams', '$location', '$cookies', 'Lazy', 'pokemons',
        function ($scope, $socket, $routeParams, $location, $cookies, Lazy, pokemons) {
            var battleId = $routeParams.battleId;

            $scope.showMenu = false;
            $scope.selectedGrid = null;
            $scope.map = [];
            
            function selectedPokemon(x, y) {
                var grid = $scope.map[x][y];
                if (grid.number) {
                    grid.jpName = pokemons[grid.number].jpName;
                    grid.active = true;
                    $scope.selectedGrid = grid;
                } else {
                    $scope.selectedGrid = null;
                }
            }

            $socket.forward('updateBattle', $scope);
            $scope.$on('socket:updateBattle', function (event, battle) {
                $scope.map = battle.map;
            });
            
            $scope.click = function(x, y) {
                selectedPokemon(x, y);
            };

            $scope.attackPokemon = function () {

            };

            $scope.catchPokemon = function () {

            };

            $scope.toggleMenu = function () {
                $scope.showMenu = !$scope.showMenu;
            };

            $scope.getPokemon = function (id) {
                return Lazy(pokemons).find(function (pokemon) {
                    return pokemon.id == id;
                });
            };


            function init() {
                $socket.emit('joinBattle', battleId);
            }

            init();

        }]);