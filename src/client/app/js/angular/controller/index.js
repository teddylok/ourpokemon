angular.module('ourPokemon')
    .config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider
                .when('/sign-in', {
                    templateUrl: '/app/sign-in.html',
                    controller: 'signInController'
                })
                .otherwise({
                    redirectTo: '/'
                });

        }])
    .controller('opIndexController', ['$scope', '$socket', '$location', '$cookies', function ($scope, $socket, $location, $cookies) {
        $scope.user = {};

        $socket.forward('signInSuccess', $scope);
        $scope.$on('socket:signInSuccess', function (event, trainer) {
            $scope.user = trainer;
        });
        
        $socket.forward('signInWithTokenSuccess', $scope);
        $scope.$on('socket:signInWithTokenSuccess', function(event, trainer){
            console.log('on sign in with token success');
            
            $scope.user = trainer;
            
            if ($location.path() == '/') {
                $location.path('/world');
            }
        });

        $socket.forward('authenticationRejected', $scope);
        $scope.$on('socket:authenticationRejected', function(event){
            $cookies.remove('username');
            $cookies.remove('token');

            $location.path('/sign-in');
        });
        
        $scope.mapMenu = function() {
            $location.path('/world'); 
        };

        $scope.pokedexMenu = function() {
            $location.path('/pokedex');
        };

        $scope.pokemonMenu = function() {
            $location.path('/pokemon');
        };
        
        $scope.bagMenu = function() {
            $location.path('/bag');
        };
        
        $scope.conversationMenu = function() {
           $location.path('/conversation'); 
        };

        $scope.optionMenu = function() {
            $location.path('/option');
        };
        
        function init() {
            if ($cookies.get('username') && $cookies.get('token')) {
                console.log('emit signInWithToken', $cookies.get('username'), $cookies.get('token'));
                $socket.emit('signInWithToken', {
                    'username': $cookies.get('username'),
                    'token': $cookies.get('token')
                });
            } else {
                console.log('go to sign in');
                
                $location.path('/sign-in');
            }
        };

        init();
    }]);