'use strict';

(function() {

  class StudentController {

    constructor($http, $scope, socket) {
      this.$http = $http;
      this.awesomeThings = [];

      $http.get('/api/students').then(response => {
        this.awesomeThings = response.data;
      socket.syncUpdates('student', this.awesomeThings);
    });

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('student');
    });
  }

  addThing() {
    if (this.newThing) {
      this.$http.post('/api/students', { name: this.newThing });
      this.newThing = '';
    }
  }

  deleteThing(thing) {
    this.$http.delete('/api/students/' + thing._id);
  }

}

angular.module('3601S16Lab5JsonDataProcessingApp')
  .controller('StudentCtrl', StudentController);

})();
