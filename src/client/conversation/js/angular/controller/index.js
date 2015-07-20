angular.module('ourPokemon.conversation')
    .config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider
                .when('/conversation', {
                    templateUrl: '/conversation/index.html',
                    controller: 'opConversationIndexController'
                })
        }])
    .controller('opConversationIndexController', ['$scope', '$socket', function ($scope, $socket) {
        $scope.room = {id: 1, name: 'Lobby'};

    }]);