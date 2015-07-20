angular.module('ourPokemon.room')
    .config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider
                .when('/room/:roomId', {
                    templateUrl: '/room/index.html',
                    controller: 'opRoomIndexController'
                })
        }])
    .controller('opRoomIndexController', ['$scope', '$socket', '$routeParams', '$location', '$cookies', 'Lazy', 'pokemons',
        function ($scope, $socket, $routeParams, $location, $cookies, Lazy, pokemons) {
            var roomId = $routeParams.roomId;
            
            $scope.startWildBattle = function() {
                $socket.emit('startWildBattle');
            };

            $socket.forward('updateBattle', $scope);
            $scope.$on('socket:updateBattle', function (event, battleId) {
                $location.path('/battle/' + battleId);
            });

            function init() {
                $socket.emit('joinRoom', roomId);
            }

            init();

        }]);