'use strict';

(function() {

class MainController {

  constructor($http, $scope, socket) {
    this.$http = $http;
    this.awesomeThings = [];
    this.sortBy = 'lastName';

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

  orderThese(parameter){
    console.log("Good job ;)");
    this.sortBy = parameter;
  }

  calculateCredits(){
      var localCredits = 0;
      for(var i=0;i < this.awesomeThings.length; i++){
        if(this.awesomeThings[i].courses.grade != "IP" && this.awesomeThings[i].courses.grade != "F") {
          for(var j=0 ; j < this.awesomeThings[i].courses.length; j++){
            localCredits = localCredits + this.awesomeThings[i].courses[j].course.credits;
          }
        }
      this.awesomeThings[i].credits = localCredits;
    }
  }


}

angular.module('newThingWeAreTestingApp')
  .controller('MainController', MainController);

})();
