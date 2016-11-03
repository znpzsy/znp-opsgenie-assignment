'use strict';

/* Register `notesList` component, along with its associated controller and template. */
angular
    .module('notesList')
    .component('notesList', {
        templateUrl: 'components/note-list/note-list.component.html'
    })
    .controller('NoteListController', NoteListController);

NoteListController.$inject = ['AlertService', '$routeParams'];

function NoteListController(AlertService, $routeParams) {
    var self = this;
    self.title = 'NoteListController';
    self.id = $routeParams.id;

    activate();

    function activate() {

        return {
            notes: AlertService.getNoteListPromise().
            then((response) => {
                var obj = angular.fromJson(response);
        if (!obj.isError) {

            self.notes = obj.filter((a) => {
                    if (a.alertId === self.id
        )
            {
                return a;
            }
        })
            ;
            return self.notes;
        }
        else {
            throw EventException('');
        }
    })
    }
    }
}
