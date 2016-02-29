'use strict';

describe('Filter: completedCourses', function () {

  // load the filter's module
  beforeEach(module('newThingWeAreTestingApp'));

  // initialize a new instance of the filter before each test
  var completedCourses;
  beforeEach(inject(function ($filter) {
    completedCourses = $filter('completedCourses');
  }));

  it('should return the input prefixed with "completedCourses filter:"', function () {
    var text = 'angularjs';
    expect(completedCourses(text)).toBe('completedCourses filter: ' + text);
  });

});
