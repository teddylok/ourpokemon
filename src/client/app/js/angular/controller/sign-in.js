angular.module('ourPokemon')
    .controller('signInController', ['$scope', '$socket', '$location', '$ngBootbox', '$cookies',
        function ($scope, $socket, $location, $ngBootbox, $cookies) {

            $scope.signInDetail = {
                "username": '',
                "password": '',
                "rememberMe": false
            };

            $scope.signIn = function () {
                if ($scope.signInDetail.username == '') {
                    $ngBootbox.alert('You must enter a username');
                    return false;
                }

                $socket.emit('signIn', $scope.signInDetail);
            };

            $socket.forward('signInSuccess', $scope);
            $scope.$on('socket:signInSuccess', function (event, trainer) {
                console.log('trainer', trainer);

                $cookies.put('username', trainer.username);
                $cookies.put('token', trainer.token);
                
                $location.path('/world');
            });

            $socket.forward('authenticationRejected', $scope);
            $scope.$on('socket:authenticationRejected', function (event){
                $cookies.remove('username');
                $cookies.remove('token');
            });

            $socket.forward('signInError', $scope);
            $scope.$on('socket:signInError', function(event, message){
                $ngBootbox.alert(message);
            });
            
            function init() {
                $cookies.remove('roomId');
                $cookies.remove('username');
                $cookies.remove('token');
            };
            
            init();

        }]);