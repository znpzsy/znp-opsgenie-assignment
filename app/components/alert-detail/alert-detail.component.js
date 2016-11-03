/**
 * Created by znpzsy on 02.11.2016.
 */
'use strict';

// Register `alertDetail` component, along with its associated controller and template
angular.module('alertDetail').component('alertDetail', {
    templateUrl: 'components/alert-detail/alert-detail.component.html'
})
    .controller('AlertDetailController', AlertDetailController);

AlertDetailController.$inject = ['AlertService', '$routeParams'];

function AlertDetailController(AlertService, $routeParams) {
    var self = this;
    self.id = $routeParams.id;
    self.title = 'AlertDetailController';
    self.notes = [{id: 0, message: 'no notes'}];

    activate();

    function activate() {

        return {
            alert: AlertService.getAlertListPromise().then((response) => {
                var obj = angular.fromJson(response);
                if (!obj.isError) {

                    self.alert = obj.filter((a) => {
                        if (a.id === self.id
                        ) {
                            return a;
                        }
                    })[0];
                    return self.alert;
                }
                else {
                    throw EventException('');
                }
            })
        }

    }
}

