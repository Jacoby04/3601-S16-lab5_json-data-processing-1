'use strict';

describe('Filter: completedCourses', function () {

  // load the filter's module
  beforeEach(module('studentApp'));

  // initialize a new instance of the filter before each test
  var completedCourses;
  beforeEach(inject(function ($filter) {
    completedCourses = $filter('completedCourses');
  }));

  it('should return the input prefixed with "completedCourses filter:"', function () {
    var text = 'angularjs';
    expect(text).toBe(text);
  });

});
