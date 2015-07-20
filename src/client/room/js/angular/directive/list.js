angular.module('ourPokemon.room')
    .controller('opRoomListController', ['$scope', '$socket', '$location', function($scope, $socket, $location) {
        $scope.rooms = [];

        $scope.newRoomName = '';

        $scope.joinRoom = function(roomId) {
            $location.path('/room/' + roomId);
        };

        $scope.createRoom = function() {
            if ($scope.newRoomName == '') {
                alert('Please enter room name');
                return false;
            }

            $socket.emit('createRoom', $scope.newRoomName);
        };

        $socket.forward('updateRooms', $scope);
        $scope.$on('socket:updateRooms', function(event, rooms, newRoomId){
            console.log('update room list', rooms);
            $scope.rooms = rooms;
        });
        
        function getRooms() {
            $socket.emit('getRooms');
        };
        
        function init() {
            getRooms();
        };
        
        init();
    }])
    .directive('opRoomList', function() {
        return {
            restrict: 'E',
            controller: 'opRoomListController',
            templateUrl: '/room/list.html',
            link: function(scope, element, attrs) {
                
            }
        };
    });