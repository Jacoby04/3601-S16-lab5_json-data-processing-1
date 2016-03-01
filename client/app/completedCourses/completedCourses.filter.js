'use strict';

angular.module('studentApp')
  .filter('completedCourses', function () {

    var blahBlah = function(studentData){
      console.log(studentData.courses[0].grade);
      return studentData.firstName;
    };

    return function (input) {
      return 'completedCourses filter: ' + blahBlah(input);
    };
  });
