'use strict';

describe('Component: MyPollsComponent', function() {
  // load the controller's module
  beforeEach(module('pollAppApp.myPolls'));

  var MyPollsComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    MyPollsComponent = $componentController('myPolls', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
