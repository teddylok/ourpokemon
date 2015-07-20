angular.module('ourPokemon.world')
    .config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider
                .when('/world', {
                    templateUrl: '/world/index.html',
                    controller: 'opWorldController'
                })
        }])
    .controller('opWorldController', ['$scope', '$socket', function ($scope, $socket) {
        $scope.room = {id: 1, name: 'Lobby'};
        
    }]);