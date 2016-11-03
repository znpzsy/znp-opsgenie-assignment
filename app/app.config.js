'use strict';

angular.
module('opsApp').
config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider.
        when('/alerts', {
            template: '<alert-list></alert-list>'
        }).
        when('/alerts/:id', {
            template: '<alert-detail></alert-detail>'
        }).
        when('/main', {
            template: '<main></main>'
        }).
        otherwise('/main');
    }
]);