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

//determines the parameter to be sorted by
  orderThese(parameter){
    console.log("Good job ;)");
    this.sortBy = parameter;
  }

//assigns credits value for each student by looping through classes and adding up credits for each class
//that is not in-progress or failed
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

//assigns GPA value for each student by looping through classes that are not in-progress
//function converts the grades for the classes into numeric value and uses numberic grade value and credit
//value to calculate GPA. calculateGPA then assigns localGPA to each student
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

//combines major1 and major2 into one string
combineMajors(){
  var majors = "";

  for(var i = 0; i < this.awesomeThings.length; i++){
    if (this.awesomeThings[i].major1 !== null) {
      majors = this.awesomeThings[i].major1
    } else {
      majors = "undeclared"
    };
    if (this.awesomeThings[i].major2 !== null) {
      majors += this.awesomeThings[i].major2
    } else {
        majors += ""
      };
    this.awesomeThings[i].majors = majors;
    majors = "";
    }
  }

//determines whether student is a freshman, sophomore, junior or senior based on their credits
  defineRank(){
    for(var i = 0; i < this.awesomeThings.length; i++){
      if(this.awesomeThings[i].credits >= 0 && this.awesomeThings[i].credits < 30){
        this.awesomeThings[i].rank = "Freshman";
      } else if (this.awesomeThings[i].credits < 60 && this.awesomeThings[i].credits >= 30){
        this.awesomeThings[i].rank = "Sophomore";
      } else if (this.awesomeThings[i].credits < 90 && this.awesomeThings[i].credits >= 60){
        this.awesomeThings[i].rank = "Junior";
      } else if (this.awesomeThings[i].credits >= 90){
        this.awesomeThings[i].rank = "Senior";
      }
    }
    return "";
  }
  
//creates a string which includes the names of all courses not in-progress
  combineCompletedCourses(){
    var completedCourses = "";

    for(var i = 0; i < this.awesomeThings.length; i++){
       for(var j = 0 ; j < this.awesomeThings[i].courses.length; j++){
          if(this.awesomeThings[i].courses[j].grade !== "IP"){
            completedCourses += this.awesomeThings[i].courses[j].course.name;
          }
       }

      this.awesomeThings[i].completedCourses = completedCourses;
      completedCourses = "";

      }
    }

//creates a string which includes the names of all courses in-progress
    combineUncompletedCourses(){
      var uncompletedCourses = "";

      for(var i = 0; i < this.awesomeThings.length; i++){
         for(var j = 0 ; j < this.awesomeThings[i].courses.length; j++){
            if(this.awesomeThings[i].courses[j].grade == "IP"){
              uncompletedCourses += this.awesomeThings[i].courses[j].course.name;
            }
         }

        this.awesomeThings[i].uncompletedCourses = uncompletedCourses;
        uncompletedCourses = "";

        }
      }





}

angular.module('newThingWeAreTestingApp')
  .controller('MainController', MainController);

})();
