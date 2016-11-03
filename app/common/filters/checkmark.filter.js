/**
 * Created by znpzsy on 02.11.2016.
 */
angular.module('core').filter('checkmark', function () {
    return function (input) {
        return input ? '\u2713' : '\u2718';
    };
});