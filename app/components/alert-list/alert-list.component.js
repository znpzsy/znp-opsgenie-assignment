/**
 * Created by znpzsy on 02.11.2016.
 */

'use strict';

/* Register `alertList` component, along with its associated controller and template. */
angular
    .module('alertList')
    .component('alertList', {
        templateUrl: 'components/alert-list/alert-list.component.html'
    })
    .controller('AlertListController', AlertListController);

AlertListController.$inject = ['AlertService'];

function AlertListController(AlertService) {
    var self = this;
    self.title = 'AlertListController';
    self.alerts = AlertService.getAlertList();
    self.orderProp = '-createdAtTimestamp';

    activate();

    function activate() {
    }
}