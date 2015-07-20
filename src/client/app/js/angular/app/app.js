var defaultLocale = 'en';

angular.module('ourPokemon', [
    'ngRoute',
    'ngCookies',
    'ngAnimate',
    'btford.socket-io',
    'jm.i18next',
    'ngSanitize',
    'cgBusy',
    'ui.bootstrap',
    'ui.bootstrap.tpls',
    'nya.bootstrap.select',
    'ngBootbox',
    'monospaced.elastic',
    'ourPokemon.util',
    'ourPokemon.data',
    'ourPokemon.world'
])
    .config(['$i18nextProvider', function ($i18nextProvider) {
        $i18nextProvider.options = {
            resGetPath: '/locale/__lng__.json',
            useCookie: false,
            useLocalStorage: false,
            fallbackLng: defaultLocale,
            preload: [],
            lng: defaultLocale,
            defaultLoadingValue: ''
        };
    }])
    .config(function ($locationProvider) {
        $locationProvider.hashPrefix('!');
    })
    //.run(['$rootScope', function ($rootScope) {
    //    //create a new instance
    //    new WOW.init();
    //
    //    $rootScope.$on('$locationChangeSuccess', function (next, current) {
    //        // when the view changes sync wow
    //        new WOW.sync();
    //    });
    //}])
    .run(['$cookies', '$i18next', function ($cookies, $i18next) {
        if (!$cookies.get('locale')) {
            $cookies.put('locale', defaultLocale, {path: '/'});
        }

        $i18next.options.lng = $cookies.get('locale');
    }])
    .value('cgBusyDefaults', {
        message: '',
        backdrop: false,
        template: '/template/loading.html',
        delay: 0,
        minDuration: 0
    });