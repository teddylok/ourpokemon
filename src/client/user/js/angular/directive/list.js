angular.module('ourPokemon.user')
    .controller('opUserListController', ['$scope', '$socket', '$location',
        function ($scope, $socket, $location) {
            $scope.users = [];

            $scope.newUserName = '';

            $scope.joinUser = function (userId) {
                $location.path('/user/' + userId);
            };

            $scope.createUser = function () {
                if ($scope.newUserName == '') {
                    alert('Please enter user name');
                    return false;
                }

                $socket.emit('createUser', $scope.newUserName);
            };

            $socket.forward('updateUsers', $scope);
            $scope.$on('socket:updateUsers', function (event, users) {
                console.log('update user list', users);
                $scope.users = users;
            });

            function getUsers() {
                $socket.emit('getUsers');
            };

            function init() {
                getUsers();
            };

            init();
        }])
    .directive('opUserList', function () {
        return {
            restrict: 'E',
            controller: 'opUserListController',
            templateUrl: '/user/list.html',
            link: function (scope, element, attrs) {

            }
        };
    });