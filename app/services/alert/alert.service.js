/**
 * Created by znpzsy on 02.11.2016.
 */

angular.module('services.alert').factory('AlertService', ['Restangular',
    function (Restangular) {

        /* service object with list of methods in it*/
        return {
            getAlertList: getAlertList,
            getAlertListPromise: getAlertListPromise,
            getNoteListPromise: getNoteListPromise
        };


        function getAlertList() {
            return Restangular.all("services/static/alerts.json").getList().$object;
        }

        function getAlertListPromise() {
            return Restangular.all("services/static/alerts.json").getList();
        }

        function getNoteListPromise() {
            return Restangular.all("services/static/notes.json").getList();
        }
    }
]).config(function(RestangularProvider) {

    // add a response interceptor
    RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
        var extractedData;
        // .. to look for getList operations
        if (operation === "getList") {
            // .. and handle the data and meta data
            extractedData = data.alerts || data.notes;
        } else {
            extractedData = data.notes;
        }
        return extractedData;
    });

});;
