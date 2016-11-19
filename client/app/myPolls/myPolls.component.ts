'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './myPolls.routes';

export class MyPollsComponent {
  /*@ngInject*/
  $http;
  socket;
  $stateParams;
  $scope;
  $state;

  polls;
  Auth;
  showMyPollsOnly: boolean = true;


  getCurrentUser: Function;


  constructor($scope, socket, $stateParams, $state, $http, Auth, $location) {
    this.$stateParams = $stateParams;
    this.socket = socket;
    this.$http = $http;
    this.$state = $state;
    this.getCurrentUser = Auth.getCurrentUserSync;
    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('poll');
    });
  }

  $onInit() {
    this.$http.get('/api/polls').then(response => {
      this.polls = response.data;
      this.socket.syncUpdates('poll', this.polls);
    });
  }
}

export default angular.module('pollAppApp.myPolls', [uiRouter])
  .config(routes)
  .component('myPolls', {
    template: require('./myPolls.html'),
    controller: MyPollsComponent,
    controllerAs: 'myPollsCtrl'
  })
  .name;
