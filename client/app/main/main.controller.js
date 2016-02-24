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
      for(var i = 0;i < this.awesomeThings.length; i++){

          for(var j = 0 ; j < this.awesomeThings[i].courses.length; j++){
            if(this.awesomeThings[i].courses[j].grade !== "IP" && this.awesomeThings[i].courses[j].grade !== "F") {
              localCredits = localCredits + this.awesomeThings[i].courses[j].course.credits;
            }
          }

      this.awesomeThings[i].credits = localCredits;
        localCredits = 0;
    }
    return "";
  }

 calculateGPA(){
   var localCredits = 0;
   var localGPA = 0;
   var immediateGPA = 0.0;
   for(var i = 0;i < this.awesomeThings.length; i++){

       for(var j = 0 ; j < this.awesomeThings[i].courses.length; j++){
         if(this.awesomeThings[i].courses[j].grade !== "IP") {
           localCredits = localCredits + parseInt(this.awesomeThings[i].courses[j].course.credits);
           if(this.awesomeThings[i].courses[j].grade === 'A') {
             immediateGPA = 4.0;
           } else if (this.awesomeThings[i].courses[j].grade === 'B') {
             immediateGPA = 3.0;
           } else if (this.awesomeThings[i].courses[j].grade === 'C') {
             immediateGPA = 2.0;
           } else if (this.awesomeThings[i].courses[j].grade === 'D') {
             immediateGPA = 1.0;
           } else {
             immediateGPA = 0.0;
             };
           localGPA = localGPA + (parseInt(this.awesomeThings[i].courses[j].course.credits) * immediateGPA);

         }
       }
   this.awesomeThings[i].gpa = (localGPA / localCredits).toFixed(3).toString();
     localCredits = 0;
     localGPA = 0;
 }
 return "";
 }

}

angular.module('newThingWeAreTestingApp')
  .controller('MainController', MainController);

})();
