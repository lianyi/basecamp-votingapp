const angular = require('angular');
const uiRouter = require('angular-ui-router');
import routing from './main.routes';

export class MainController {
  $http;
  socket;
  polls = [];
  Auth;
  getCurrentUser: Function;
  showMyPollsOnly: boolean = false;
  /*@ngInject*/
  constructor($http, $scope, socket, Auth) {
    this.$http = $http;
    this.socket = socket;
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

export default angular.module('pollAppApp.main', [
  uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
