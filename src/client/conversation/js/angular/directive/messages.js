angular.module('ourPokemon.conversation')
    .controller('opConversationMessagesController', ['$scope', '$socket', function ($scope, $socket) {

        $socket.forward('updateMessage', $scope);
        $scope.$on('socket:updateMessage', function(event, username, message) {
            console.log('on update message', username, message);

            $scope.messages.push({
                username: username,
                message: message
            });
        });
    }])
    .directive('opConversationMessages', ['$socket', function ($socket) {
        return {
            restrict: 'E',
            templateUrl: '/conversation/messages.html',
            controller: 'opConversationMessagesController',
            scope: {
                messages: "="
            },
            link: function(scope, element, attrs) {
                scope.$watch('messages', function(){
                    var conversations = $(element).find('.messages');
                    conversations.animate({ scrollTop: conversations[0].scrollHeight}, 500);
                });
            }
        };
    }]);