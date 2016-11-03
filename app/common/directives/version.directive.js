/**
 * Created by znpzsy on 02.11.2016.
 */
'use strict';

angular.module('version-directive', [])

    .directive('appVersion', ['version', function(version) {
        return function(scope, elm, attrs) {
            elm.text(version);
        };
    }]);
