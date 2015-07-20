angular.module('ourPokemon.pokemon')
    .config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider
                .when('/pokemon', {
                    templateUrl: '/pokemon/index.html',
                    controller: 'opPokemonIndexController'
                })
        }])
    .controller('opPokemonIndexController', ['$scope', '$socket', '$routeParams', '$location', '$cookies', 'Lazy', 'pokemons',
        function ($scope, $socket, $routeParams, $location, $cookies, Lazy, pokemons) {
            $scope.pokemonTeam = [];
            $scope.pokemonBox = [];

            $socket.forward('updatePokemonTeam', $scope);
            $scope.$on('socket:updatePokemonTeam', function(event, team){
                if (!team) {
                    return false;
                }

                $scope.pokemonTeam = team;
                console.log('$scope.pokemonTeam', $scope.pokemonTeam);
            });

            $socket.forward('updatePokemonBox', $scope);
            $scope.$on('socket:updatePokemonBox', function(event, box){
                if (!box) {
                    return false;
                }
                
                $scope.pokemonBox = box;
                console.log('$scope.pokemonBox', $scope.pokemonBox);
            });

            function init() {
                $socket.emit('getPokemonBox');
                $socket.emit('getPokemonTeam');
            }

            init();

        }]);