'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('myPolls', {
      url: '/myPolls',
      template: '<my-polls></my-polls>'
    });
}
