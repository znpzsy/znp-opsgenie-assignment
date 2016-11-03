/**
 * Created by znpzsy on 02.11.2016.
 */

'use strict';

/* Register `main` component, along with its associated controller and template. */
angular
    .module('main')
    .component('main', {
        templateUrl: 'components/main/main.component.html'
    })
    .controller('MainController', MainController);

MainController.$inject = ['AlertService'];

function MainController(AlertService) {
    var self = this;
    self.title = 'MainController';
    self.alerts = AlertService.getAlertList();

    activate();

    function activate() {

    }
}