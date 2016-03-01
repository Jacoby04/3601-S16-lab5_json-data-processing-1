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

  it('should concat two majors', function() {
    this.major1 = "CSCI";
    this.major2 = "MATH";
    this.majors = this.major1 + this.major2;
    expect(this.majors).toEqual("CSCIMATH");
  });

  it('should figure out  how many completed courses', function(){
    this.courses = ['course1', 'course2', 'course3'];
    expect(this.courses.length).toEqual(3);
  });

  it('should figure out  how many completed courses', function(){
    this.courses = ['course1', 'course2', 'course3'];
    expect(this.courses.length).toEqual(3);
  });
  
  it('should figure out  how many completed courses', function(){
    this.courses = ['course1', 'course2', 'course3'];
    expect(this.courses.length).toEqual(3);
  });
});
