angular.module('ourPokemon.conversation')
    .controller('opConversationController', ['$scope', '$socket', function($scope, $socket) {
        $scope.messages = [];
        
        $scope.message = '';

        $scope.sendMessage = function() {
            if ($scope.message == '') {
                return false;
            }

            $socket.emit('sendMessage', $scope.message);
            $scope.message = '';
        };
        
        function init() {
            console.log('conversation $scope.room', $scope.room);
            
            $scope.messages.push({
                username: 'System',
                message: 'Welcome to ' + $scope.room.name
            });
        };
        
        init();
    }])
    .directive('opConversation', function() {
        return {
            restrict: 'E',
            controller: 'opConversationController',
            templateUrl: '/conversation/conversation.html',
            scope: {
                room: '='
            },
            link: function(scope, element, attrs) {

            }
        };
    });