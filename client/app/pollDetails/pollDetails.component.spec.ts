'use strict';

describe('Component: PollDetailsComponent', function() {
  // load the controller's module
  beforeEach(module('pollAppApp.pollDetails'));

  var PollDetailsComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    PollDetailsComponent = $componentController('pollDetails', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
