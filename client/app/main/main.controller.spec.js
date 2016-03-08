'use strict';

describe('Controller: MainController', function() {

  // load the controller's module
  beforeEach(module('studentApp'));
  beforeEach(module('stateMock'));
  beforeEach(module('socketMock'));

  var scope;
  var MainController;
  var state;
  var $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function(_$httpBackend_, $controller, $rootScope, $state) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/things')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

    scope = $rootScope.$new();
    state = $state;
    MainController = $controller('MainController', {
      $scope: scope
    });
  }));

  describe('Student Manipulation logic', function() {
    beforeEach( function() {
      MainController.awesomeThings = [{
        "firstName": "Love",
        "lastName": "Roberts",
        "dateOfBirth": "1989-01-18",
        "gender": "male",
        "email": "loveroberts@eweville.com",
        "phone": "+1 (875) 519-3316",
        "address": "562 Eastern Parkway, Crayne, Virginia, 5152",
        "courses": [
          {
            "course": {
              "name": "Models of Computing Systems",
              "subject": "CSCI",
              "courseNumber": 3401,
              "credits": 5
            },
            "grade": "A"
          },
          {
            "course": {
              "name": "Software Design and Development",
              "subject": "CSCI",
              "courseNumber": 3601,
              "credits": 5
            },
            "grade": "D"
          },
          {
            "course": {
              "name": "PreCalculus I: Functions",
              "subject": "MATH",
              "courseNumber": 1012,
              "credits": 5
            },
            "grade": "C"
          },
          {
            "course": {
              "name": "Calculus II",
              "subject": "MATH",
              "courseNumber": 1102,
              "credits": 5
            },
            "grade": "IP"
          },
          {
            "course": {
              "name": "Data Structures",
              "subject": "CSCI",
              "courseNumber": 2101,
              "credits": 5
            },
            "grade": "A"
          },
          {
            "course": {
              "name": "Theory: Quantum Computing",
              "subject": "CSCI",
              "courseNumber": 4557,
              "credits": 4
            },
            "grade": "B"
          },
          {
            "course": {
              "name": "Beginning French I",
              "subject": "FREN",
              "courseNumber": 1001,
              "credits": 4
            },
            "grade": "C"
          },
          {
            "course": {
              "name": "Intermediate French I",
              "subject": "FREN",
              "courseNumber": 2001,
              "credits": 4
            },
            "grade": "B"
          },
          {
            "course": {
              "name": "Intermediate French II",
              "subject": "FREN",
              "courseNumber": 2002,
              "credits": 4
            },
            "grade": "B"
          },
          {
            "course": {
              "name": "Reading and Analysis of Texts",
              "subject": "FREN",
              "courseNumber": 3401,
              "credits": 4
            },
            "grade": "C"
          },
          {
            "course": {
              "name": "Fundamentals of Genetics, Evolution, and Development",
              "subject": "BIOL",
              "courseNumber": 1101,
              "credits": 3
            },
            "grade": "B"
          },
          {
            "course": {
              "name": "Introduction to Film Studies",
              "subject": "ENGL",
              "courseNumber": 2015,
              "credits": 4
            },
            "grade": "C"
          },
          {
            "course": {
              "name": "Beginning Ceramics",
              "subject": "ARTS",
              "courseNumber": 1050,
              "credits": 3
            },
            "grade": "B"
          }
        ],
        "major1": "ENGLISH",
        "major2": null
      },
      {
        "firstName": "Hilary",
        "lastName": "Morgan",
        "dateOfBirth": "1987-01-21",
        "gender": "female",
        "email": "hilarymorgan@eweville.com",
        "phone": "+1 (980) 437-2261",
        "address": "254 Stoddard Place, Chautauqua, Hawaii, 4930",
        "courses": [
          {
            "course": {
              "name": "Foundations of Computer Science",
              "subject": "CSCI",
              "courseNumber": 1302,
              "credits": 4
            },
            "grade": "A"
          },
          {
            "course": {
              "name": "Models of Computing Systems",
              "subject": "CSCI",
              "courseNumber": 3401,
              "credits": 5
            },
            "grade": "D"
          },
          {
            "course": {
              "name": "Software Design and Development",
              "subject": "CSCI",
              "courseNumber": 3601,
              "credits": 5
            },
            "grade": "A"
          },
          {
            "course": {
              "name": "PreCalculus I: Functions",
              "subject": "MATH",
              "courseNumber": 1012,
              "credits": 5
            },
            "grade": "D"
          },
          {
            "course": {
              "name": "PreCalculus II: Trigonometry",
              "subject": "MATH",
              "courseNumber": 1013,
              "credits": 2
            },
            "grade": "B"
          },
          {
            "course": {
              "name": "Calculus III",
              "subject": "MATH",
              "courseNumber": 2101,
              "credits": 4
            },
            "grade": "F"
          },
          {
            "course": {
              "name": "Mathematical Perspectives",
              "subject": "MATH",
              "courseNumber": 2202,
              "credits": 4
            },
            "grade": "F"
          },
          {
            "course": {
              "name": "Data Structures",
              "subject": "CSCI",
              "courseNumber": 2101,
              "credits": 5
            },
            "grade": "IP"
          },
          {
            "course": {
              "name": "Programming and Languages: Human-Computer Interaction and Interface Design",
              "subject": "CSCI",
              "courseNumber": 4656,
              "credits": 4
            },
            "grade": "B"
          },
          {
            "course": {
              "name": "Theory: Quantum Computing",
              "subject": "CSCI",
              "courseNumber": 4557,
              "credits": 4
            },
            "grade": "B"
          },
          {
            "course": {
              "name": "Beginning French I",
              "subject": "FREN",
              "courseNumber": 1001,
              "credits": 4
            },
            "grade": "B"
          },
          {
            "course": {
              "name": "Beginning French II",
              "subject": "FREN",
              "courseNumber": 1002,
              "credits": 4
            },
            "grade": "IP"
          },
          {
            "course": {
              "name": "Intermediate French I",
              "subject": "FREN",
              "courseNumber": 2001,
              "credits": 4
            },
            "grade": "A"
          },
          {
            "course": {
              "name": "Intermediate French II",
              "subject": "FREN",
              "courseNumber": 2002,
              "credits": 4
            },
            "grade": "B"
          },
          {
            "course": {
              "name": "Writing for the Liberal Arts",
              "subject": "ENGL",
              "courseNumber": 1601,
              "credits": 4
            },
            "grade": "C"
          },
          {
            "course": {
              "name": "Beginning Ceramics",
              "subject": "ARTS",
              "courseNumber": 1050,
              "credits": 3
            },
            "grade": "B"
          }
        ],
        "major1": "MATH",
        "major2": null
      }]
    });

    it('should add a credits field to each student with the number of completed credits.', function() {
      MainController.calculateCredits();
      expect(MainController.awesomeThings[0].credits).toBe(50);
      expect(MainController.awesomeThings[1].credits).toBe(48);
    });
  });
  
});
