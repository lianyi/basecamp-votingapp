'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './pollDetails.routes';

export class PollDetailsComponent {
  /*@ngInject*/
  $http;
  socket;
  $stateParams;
  $scope;
  $state;
  pollId;
  poll;

  constructor($scope, socket, $stateParams, $state, $http) {
    this.$stateParams = $stateParams;
    this.pollId = $stateParams.pollId;
    this.socket = socket;
    this.$http = $http;
    this.$state = $state;

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('poll');
    });
  }

  $onInit() {
    this.$http.get('/api/polls/' + this.pollId).then(response => {
        this.poll = response.data;
        this.socket.syncUpdates('poll', this.poll);
      }, () => this.$state.go("main")
    );
  }
}

export default angular.module('pollAppApp.pollDetails', [uiRouter])
  .config(routes)
  .component('pollDetails', {
    template: require('./pollDetails.html'),
    controller: PollDetailsComponent,
    controllerAs: 'pollDetailsCtrl'
  })
  .name;
