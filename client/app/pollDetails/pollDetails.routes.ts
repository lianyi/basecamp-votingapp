'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('pollDetails', {
      url: '/pollDetails/:pollId',
      template: '<poll-details></poll-details>'
    });
}
